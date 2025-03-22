import React from "react";
import { View, Text } from "react-native";
import { useThemeContext } from "../ThemeContext";
import { Buttom } from "./Buttom";
import styled from "styled-components/native";

const Container = styled.View<{ theme: { colors: { background: string } } }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const HomeScreen = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Container theme={theme}>
      <Text style={{ fontSize: 24, color: theme.colors.text }}>
        Olá, Mundo!
      </Text>
      <Buttom theme={theme} title="Trocar Tema" onPress={toggleTheme} />
    </Container>
  );
};

export default HomeScreen;
