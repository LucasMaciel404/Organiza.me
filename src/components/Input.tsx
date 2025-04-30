import React from "react";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";
import { useThemeContext } from "../context/ThemeContext";

type Props = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
}: Props) {
  const { theme } = useThemeContext();

  return (
    <StyledTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={theme.colors.text}
      theme={theme}
    />
  );
}

const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 8px;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
`;
