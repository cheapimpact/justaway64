import { Box, BoxProps, useColorMode } from "@chakra-ui/react";
import React from "react";
import { defaultColor } from "../../../utils/defaultColor";

interface CardProps extends BoxProps {}

export const Card: React.FC<CardProps> = ({ children, ...BoxProps }) => {
  const { colorMode } = useColorMode();
  const { color, bdColor, bgColor } = defaultColor();
  return (
    <Box
      px={3}
      py={4}
      mx={3}
      my={4}
      rounded="sm"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...BoxProps}
      borderWidth="0.010rem"
      borderStyle="solid"
      borderColor={bdColor[colorMode]}
    >
      {children}
    </Box>
  );
};

interface CardHeaderProps extends BoxProps {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.700" };
  const color = { light: "black", dark: "white" };
  return (
    <Box
      top={0}
      mt={0}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      {children}
    </Box>
  );
};
