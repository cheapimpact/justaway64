import {
  Resolver,
  Mutation,
  Field,
  Arg,
  Ctx,
  InputType,
  ObjectType,
  Query,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../type";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";

@InputType()
class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: String;
  @Field()
  message: String;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    //not logged in
    const session = req.session;
    console.log({ session });

    // if (!req.session.userId) {
    //   return null;
    // }
    const user = await User.findOne(req.session.userId);
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!input.email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email format",
          },
        ],
      };
    }
    if (input.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "username length must greater than 2",
          },
        ],
      };
    }
    if (input.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "password length must greater than 3",
          },
        ],
      };
    }
    const hashsedPassword = await argon2.hash(input.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email: input.email,
            username: input.username,
            password: hashsedPassword,
          },
        ])
        .returning("*")
        .execute();
      console.log({ result });
      user = result.raw[0];
    } catch (err) {
      console.log({ err });

      if (err.code === "23505" || err.detail.includes("already exists.")) {
        // duplicate username error
        let errorField;
        if (err.detail.includes("email")) {
          errorField = "email";
        } else if (err.detail.includes("username")) {
          errorField = "username";
        }
        return {
          errors: [
            {
              field: errorField as string,
              message: `${errorField} already taken`,
            },
          ],
        };
      }
      console.log(err.message);
    }

    // store user id, basically make an autoligin after register
    req.session.userId = user.id;
    return { user };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const verify = await argon2.verify(user.password, password);
    if (!verify) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((result) =>
      req.session.destroy((err) => {
        if (err) {
          console.log({ err });
          result(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        result(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 //24 hours
    );
    sendEmail(
      email,
      "Forgot Password",
      `<a href="http://localhost:3000/change-password/${token}">reset password<a/>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must greater than 2",
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "newPassword",
            message:
              "Something wrong, i can fell it, probably the token is expired (24hours)",
          },
        ],
      };
    }
    const userIdInt = parseInt(userId);
    const user = await User.findOne(userIdInt);
    if (!user) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Something wrong, i can fell it",
          },
        ],
      };
    }
    const newHashedPassword = await argon2.hash(newPassword);
    user.password = newHashedPassword;
    await User.update(
      { id: userIdInt },
      {
        password: newHashedPassword,
      }
    );
    redis.del(key);
    req.session.userId = user.id;
    return { user };
  }
}
