import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "./Card/Card";

interface CopyTextProps {
  children: string;
}

export const CopyText: React.FC<CopyTextProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Text>
      <Button
        colorScheme="teal"
        size="xs"
        onClick={() => {
          navigator.clipboard.writeText(children);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </Button>{" "}
      {children}
    </Text>
  );
};
