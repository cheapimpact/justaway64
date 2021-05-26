import { Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "@components/customs/Card/Card";
import { InputField } from "@components/input-field/InputField";
import { JustawayBG } from "@components/JustawayBG";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { toErrorMap } from "@utils/toErrorMap";

const ChangePassword: NextPage<{}> = ({}) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  return (
    <>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token:
              typeof router.query.token === "string" ? router.query.token : "",
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
            <Button
              colorScheme="telegram"
              type="submit"
              isLoading={isSubmitting}
              isFullWidth
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const Wrapper: React.FC<{}> = ({}) => {
  return (
    <JustawayBG>
      <Card zIndex={1} m="auto" minW="30vw" maxW="40vw">
        <Heading as="h3" size="lg" mb="3">
          Forgot Password
        </Heading>
        <Card w="100%" m={0}>
          <ChangePassword />
        </Card>
      </Card>
    </JustawayBG>
  );
};

export default withUrqlClient(createUrqlClient)(Wrapper);
