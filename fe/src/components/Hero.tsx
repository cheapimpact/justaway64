import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" alignItems="center">
    <Heading fontSize="3vw">{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
