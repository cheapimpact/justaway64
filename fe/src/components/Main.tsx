import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="60vw"
    pt="20vh"
    px="1rem"
    {...props}
  />
);
