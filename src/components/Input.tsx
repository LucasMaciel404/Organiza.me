import React from "react";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";

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
  return (
    <StyledTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
    />
  );
}

const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
`;
