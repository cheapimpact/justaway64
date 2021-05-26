import { Image } from "@chakra-ui/image";
import React, { Children } from "react";

interface JustawayBGProps {}

export const JustawayBG: React.FC<JustawayBGProps> = ({ children }) => {
  return (
    <>
      <Image
        w="30%"
        mr="50%"
        pos="absolute"
        src="/logo/justawaylogo.svg"
        transform="rotate(-30deg)"
      />
      {children}
    </>
  );
};
