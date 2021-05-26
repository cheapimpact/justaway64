import { Box, BoxProps, Input } from "@chakra-ui/react";
import React from "react";

interface GlobalFilterProps extends BoxProps {
  filter: string;
  setFilter: Function;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
  filter,
  setFilter,
  ...BoxProps
}) => {
  return (
    <Box {...BoxProps}>
      <Input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Cari..."
        size="sm"
      />
    </Box>
  );
};
