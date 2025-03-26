import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";

interface RequestCard {
  name: string;
  value: number;
  date: string;
}

export default function Card( request : RequestCard) {

  const { theme } = useThemeContext();

  return (

    <Item theme={theme}>
        <Description colorText={theme.card.text}>{request.name}</Description>
        <Value colorText={theme.card.text}>${request.value}</Value>
        <Date colorText={theme.card.text}>{request.date}</Date>
    </Item>
  );
}

const Item = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.card.background};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  padding: 16px;
  border-radius: 8px;

  /* Sombras no iOS */
  shadow-color: ${(props) => props.theme.card.text};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.5;
  shadow-radius: 1px;

  /* Sombras no Android */
  elevation: 1;
`;
const Description = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;
const Value = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;  
const Date = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;  
