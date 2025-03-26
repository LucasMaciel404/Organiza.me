import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";
import { View, Text, PixelRatio } from "react-native";

interface StatusMoneyProps {
  salario: number;
  gasto: number;
  saldo: number;
}

export default function StatusMoney({ salario, gasto, saldo }: StatusMoneyProps) {
  const { theme } = useThemeContext();

  return (
    <Container theme={theme}>
      <Row>
        <Col>
          <Center>
            <Span>Salario</Span>
            <Title color={theme.colors.success}> {salario}$ </Title>
          </Center>
        </Col>
        <Col>
          <Center>
            <Span>Dividas</Span>
            <Title color={theme.colors.warning}> {gasto}$ </Title>
          </Center>
        </Col>
        <Col>
          <Center>
            <Span>Saldo</Span>
            <Title color={theme.colors.text}> {saldo}$ </Title>
          </Center>
        </Col>
      </Row>
    </Container>
  );
}

const fontSize = PixelRatio.getFontScale() * 16;

const Container = styled.View`
  
  background-color: ${(props) => props.theme.background};
  
  
  width: 100%;
  
  display: flex;
  
  flex-wrap: wrap;
  
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

const Title = styled.Text<{color: string}>`
  font-size: ${fontSize * 3}px;
  font-weight: bold;
  color: ${(props) => props.color};
  `;

const Span = styled.Text`
  font-size: 20px;
  font-weight: bold;
  
  color: #b1b1b1;
  `;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  `;

const Col = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

const Center = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  /* border: black 1px solid; */

  align-items: center;
  justify-content: center;
`;