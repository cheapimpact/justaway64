import { Button } from "@chakra-ui/button";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/layout";
import { Card } from "@components/customs/Card/Card";
import { InputField } from "@components/input-field/InputField";
import { JustawayBG } from "@components/JustawayBG";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { toErrorMap } from "@utils/toErrorMap";
interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          if (typeof router.query.next === "string") {
            router.push(router.query.next);
          } else {
            router.push("/");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <VStack>
            <InputField name="username" placeholder="User Names" />
            <InputField name="password" type="password" />
            <Box textAlign="right" w="100%">
              <NextLink href="/forgot-password">
                <Link>
                  <Text as="sup">forgot password?</Text>
                </Link>
              </NextLink>
            </Box>
            <Button
              colorScheme="telegram"
              type="submit"
              isLoading={isSubmitting}
              isFullWidth
              mb={0}
            >
              Login
            </Button>
          </VStack>
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
          Login Page
        </Heading>
        <Card w="100%" m={0}>
          <Login />
        </Card>
      </Card>
    </JustawayBG>
  );
};
export default withUrqlClient(createUrqlClient)(Wrapper);
