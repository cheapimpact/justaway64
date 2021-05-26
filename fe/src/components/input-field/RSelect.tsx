import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorMode,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import Select, { OptionsType, OptionTypeBase } from "react-select";
import AsyncSelect from "react-select/async";
import { defaultColor } from "../../utils/defaultColor";

// masih berantakan

type RSelectProps = OptionTypeBase & {
  getOptionLabel?: (arg0: any) => string;
  getOptionValue?: (arg0: any) => string;
  placeholder: string;
  label: string;
  name: string;
  variant?: "textarea" | "select" | null;
  inline?: boolean;
  options?: any;
  async?: boolean;
  readOnly?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsType<OptionTypeBase>) => void
  ) => void | Promise<any>;
};

export const RSelect: React.FC<RSelectProps> = ({
  label,
  variant,
  inline = false,
  options,
  getOptionLabel,
  getOptionValue,
  async = false,
  loadOptions,
  readOnly = false,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const { colorMode } = useColorMode();
  const { bgColor, color, bgColorReadOnly } = defaultColor();

  const RSelectChakra = {
    control: (control: any) => ({
      ...control,
      borderRadius: 6,
      borderColor: !!error && touched ? "red" : "gray.400",
      borderWidth: !!error && touched ? 3 : 2,
      backgroundColor: readOnly
        ? bgColorReadOnly[colorMode]
        : bgColor[colorMode],
      color: color,
    }),
    option: (option: any, { isFocused }: any) => ({
      ...option,
      backgroundColor: isFocused ? "lightblue" : null,
      color: color,
    }),
    menu: (provided: any) => {
      return {
        ...provided,
        backgroundColor: bgColor[colorMode],
        marginTop: 1,
      };
    },
    singleValue: (provided: any) => {
      return {
        ...provided,
        color: color,
      };
    },
  };

  let C: any = Select;
  if (async) {
    C = AsyncSelect;
  }
  return (
    <>
      <FormControl
        isInvalid={!!error && touched}
        as={inline ? Flex : Box}
        mt={4}
      >
        <Box flex={2}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
        </Box>
        {/* kalau gapake box/div, select ga sejajar */}
        <Box flex={4}>
          <C
            {...field}
            {...props}
            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            styles={RSelectChakra}
            loadOptions={loadOptions}
            isDisabled={readOnly}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </Box>
      </FormControl>
    </>
  );
};
