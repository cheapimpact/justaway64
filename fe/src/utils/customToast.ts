import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast({
    position: "bottom-left",
    variant: "left-accent",
    isClosable: true,
  });
  return toast;
};
