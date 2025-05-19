import React from "react";
import { useThemeContext } from "./../src/context/ThemeContext"; // Hook para acessar o contexto de tema
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"; // Importa a biblioteca de ícones do Expo

export const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useThemeContext(); // Acessa o toggle e o tema do contexto

  return (
    <ToggleButtonContainer theme={theme}>
      {/* Exibe o ícone baseado no tema */}
      <Ionicons
        name={theme.colors.theme === "dark" ? "moon" : "sunny"} // Lua para tema escuro, Sol para tema claro
        size={theme.colors.theme === "dark" ? 25 : 30}
        color={theme.colors.theme === "dark" ? "#fff" : "#000"} // Cor do ícone com base no tema
        onPress={toggleTheme} // Alterna o tema ao pressionar
      />
    </ToggleButtonContainer>
  );
};

// Estilizando o botão de alternância
const ToggleButtonContainer = styled.View`
  margin-top: 0;
  padding: 0;
  background-color: ${(props) => props.theme.colors.background};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
