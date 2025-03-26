import { useThemeContext } from "../ThemeContext";
import styled from "styled-components/native";
import StatusMoney from "../components/Status";
import Line from "../components/Line";
import Card  from "../components/CardItem";
import { useEffect } from "react";
import { Text } from "react-native";
import { useStorage } from "../hooks/useStorage";

export default function HomePage() {
  const { theme } = useThemeContext();

  const { storedValue, saveData, getData, removeData } = useStorage("@user");
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container style={{ flex: 1 }} theme={theme}>
      <StatusMoney salario={1500} gasto={1045} saldo={415} />
      <Line />
      <Card name="Conta de energia" value={9000} date='01-02-2020' />
      <Text>Usuário salvo: {storedValue ? JSON.stringify(storedValue) : "Nenhum"}</Text>
      
    </Container>
  );
}
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};

  /* border: black 1px solid; */
  margin: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Title = styled.Text<{ colorText: string }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.colorText};
`;
