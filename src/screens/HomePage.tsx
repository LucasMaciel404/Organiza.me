import { useThemeContext } from "../ThemeContext";
import styled from "styled-components/native";
import StatusMoney from "../components/Status";
import Line from "../components/Line";
import Card from "../components/CardItem";
import { useStorageContext } from "../context/StorangeContext";

export default function HomePage() {
  const { theme } = useThemeContext();
  const { data, removeItem } = useStorageContext();

  const salario = 1500;

  const gasto = Array.isArray(data)
    ? data.reduce((total, item) => {
        const valor = typeof item.value === "number" ? item.value : parseFloat(item.value);
        return total + (isNaN(valor) ? 0 : valor);
      }, 0)
    : 0;

  const saldo = salario - gasto;

  const handleDelete = (id: string) => {
    removeItem(id);
  };

  return (
    <Container theme={theme}>
      <StatusMoney salario={salario} gasto={gasto} saldo={saldo} />
      <Line />
      <ListaComponentes>
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            value={item.value}
            date={item.date}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </ListaComponentes>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  margin: 10px;
  padding: 10px;
`;

const ListaComponentes = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;
`;
