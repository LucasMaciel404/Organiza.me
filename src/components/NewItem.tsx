import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";

export default function NewItem() {
  const { theme } = useThemeContext();



  return (
    <Conteiner theme={theme}>
      <MaterialCommunityIcons name="pencil-plus" size={24} theme={theme} />
    </Conteiner>
  );
}

const Conteiner = styled.View`
  width: 70px;
  height: 70px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.card.background};
  color: ${(props) => props.theme.card.text};
  border: 1px solid ${({ theme }) => theme.card.text};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10%;
  right: 30px;
`;
