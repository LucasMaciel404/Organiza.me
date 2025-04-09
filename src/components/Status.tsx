import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";

interface StatusMoneyProps {
  salario: number;
  gasto: number;
  saldo: number;
}

export default function StatusMoney({ salario, gasto, saldo }: StatusMoneyProps) {
  const { theme } = useThemeContext();

  return (
    <Container>
      <Row>
        <InfoBox>
          <Label>Salário R$:</Label>
          <Value color={theme.colors.success}>
            {salario.toFixed(2)}
          </Value>
        </InfoBox>

        <InfoBox>
          <Label>Dívidas R$:</Label>
          <Value color={theme.colors.warning}>
            {gasto.toFixed(2)}
          </Value>
        </InfoBox>

        <InfoBox>
          <Label>Saldo R$:</Label>
          <Value color={theme.colors.text}>
            {saldo.toFixed(2)}
          </Value>
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
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin-top: 5px;
`;
