import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";

interface StatusMoneyProps {
  salario: number;
  gasto: number;
  saldo: number;
}

export default function StatusMoney({
  salario,
  gasto,
  saldo,
}: StatusMoneyProps) {
  const { theme } = useThemeContext();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

  return (
    <Container>
      <Row>
        <InfoBox>
          <Label theme={theme}>Salário:</Label>
          <Value color={theme.colors.success}>{formatCurrency(salario)}</Value>
        </InfoBox>

        <InfoBox>
          <Label theme={theme}>Dívidas:</Label>
          <Value color={theme.colors.warning}>{formatCurrency(gasto)}</Value>
        </InfoBox>

        <InfoBox>
          <Label theme={theme}>Saldo:</Label>
          <Value color={theme.colors.text}>{formatCurrency(saldo)}</Value>
        </InfoBox>
      </Row>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  padding: 20px 10px;
  background-color: ${(props) => props.theme.background};
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoBox = styled.View`
  width: 30%;
  min-width: 110px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: start;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
`;

const Value = styled.Text<{ color: string }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin-top: 5px;
  text-align: center;
  min-height: 30px;
`;
