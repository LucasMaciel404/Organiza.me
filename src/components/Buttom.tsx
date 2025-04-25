import { styled } from "styled-components/native";

interface ButtonProps {
  theme: {
    colors: {
      primary: string;
      background: string;
      surface: string;
      text: string;
      accent: string;
    };
  };
}

export const Buttom = styled.Button<ButtonProps>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin: 10px;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;
