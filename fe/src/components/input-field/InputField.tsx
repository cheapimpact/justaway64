import {
  Box,
  Button,
  Checkbox,
  ComponentWithAs,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { defaultColor } from "../../utils/defaultColor";
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  variant?: "textarea" | "select" | "checkbox" | "number" | null;
  inline?: boolean;
  options?: any;
  noLabel?: boolean;
  rigtElement?: string;
  rigtElementOnClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  rigtElementIsLoading?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _, //_ mean unuse var( preferable) --> kenapa dideclare karena ada error typescripc.... cek aja kalau dihapus...
  variant,
  inline = false,
  options,
  noLabel,
  rigtElement,
  rigtElementOnClick,
  rigtElementIsLoading = false,
  isDisabled,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const { bgColorReadOnly, color } = defaultColor();
  let C: ComponentWithAs<any, any> = Input;
  switch (variant) {
    case "textarea":
      C = Textarea;
      break;
    case "select":
      C = Select;
      break;
    case "checkbox":
      C = Checkbox;
      break;
    default:
      break;
  }
  const [field, { error }] = useField(props);

  return (
    <>
      <FormControl
        isInvalid={!!error}
        as={inline ? Flex : Box}
        mt={inline ? 4 : 2}
      >
        {!noLabel && (
          <Box flex={2}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
          </Box>
        )}
        <Box flex={4}>
          <InputGroup>
            <C
              {...field}
              {...props}
              flex={4}
              id={field.name}
              placeholder={props.placeholder}
              _readOnly={{ background: bgColorReadOnly[colorMode] }}
              isDisabled={isDisabled}
            >
              {options}
            </C>
            {rigtElement && (
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={rigtElementOnClick}
                  isLoading={rigtElementIsLoading}
                  zIndex={1}
                  isDisabled={props.readOnly}
                >
                  Cari
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </Box>
      </FormControl>
    </>
  );
};
