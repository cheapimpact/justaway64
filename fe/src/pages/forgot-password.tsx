import { Button } from "@chakra-ui/button";
import { Heading, VStack } from "@chakra-ui/layout";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Card } from "@components/customs/Card/Card";
import { InputField } from "@components/input-field/InputField";
import { JustawayBG } from "@components/JustawayBG";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, {}) => {
        await forgotPassword(values);
        setComplete(true);
      }}
    >
      {({ isSubmitting }) =>
        complete ? (
          <Alert status="success">
            <AlertIcon />
            Email sent!, if that email is exist in our db😏
          </Alert>
        ) : (
          <Form>
            <VStack>
              <InputField name="email" placeholder="email" />
              <Button
                colorScheme="telegram"
                type="submit"
                isLoading={isSubmitting}
                isFullWidth
                mb={0}
              >
                Send Email
              </Button>
            </VStack>
          </Form>
        )
      }
    </Formik>
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
          <ForgotPassword />
        </Card>
      </Card>
    </JustawayBG>
  );
};
export default withUrqlClient(createUrqlClient)(Wrapper);
