import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "@components/input-field/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "@utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { Card } from "@components/customs/Card/Card";
import { JustawayBG } from "@components/JustawayBG";
import NextLink from "next/link";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ input: values });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="email" placeholder="email" />
          <InputField name="username" placeholder="username" />
          <InputField name="password" type="password" placeholder="password" />
          <Box textAlign="right" w="100%">
            <NextLink href="/login">
              <Link>
                <Text as="sup">Already have an account?</Text>
              </Link>
            </NextLink>
          </Box>
          <Button
            colorScheme="telegram"
            type="submit"
            isFullWidth
            isLoading={isSubmitting}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Wrapper: React.FC<{}> = ({}) => {
  return (
    <JustawayBG>
      <Card zIndex={1} m="auto" minW="30vw" maxW="40vw">
        <Heading as="h3" size="lg" mb="3">
          Register Page
        </Heading>
        <Card w="100%" m={0}>
          <Register />
        </Card>
      </Card>
    </JustawayBG>
  );
};

export default withUrqlClient(createUrqlClient)(Wrapper);
