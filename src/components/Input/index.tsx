import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { StyledInput } from "./styles";

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme();

  return (
    <StyledInput
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_200}
      {...rest}
    />
  );
}
