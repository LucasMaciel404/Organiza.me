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
    }).format(value);

  return (
    <Container>
      <Row>
        <InfoBox>
          <Label>Salário:</Label>
          <Value color={theme.colors.success}>{formatCurrency(salario)}</Value>
        </InfoBox>

        <InfoBox>
          <Label>Dívidas:</Label>
          <Value color={theme.colors.warning}>{formatCurrency(gasto)}</Value>
        </InfoBox>

        <InfoBox>
          <Label>Saldo:</Label>
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
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #b1b1b1;
  font-weight: bold;
`;

const Value = styled.Text<{ color: string }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin-top: 5px;
`;
