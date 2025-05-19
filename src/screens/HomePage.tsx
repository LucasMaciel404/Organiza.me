import { useThemeContext } from "../context/ThemeContext";
import styled from "styled-components/native";
import StatusMoney from "../components/Status";
import Line from "../components/Line";
import Card from "../components/CardItem";
import { useSettingsContext } from "../context/SettingsContext";
import AlertInEnpty from "../components/AlertInEnpty";
import { useEffect, useState } from "react";
import { getCards } from "./../services/cardService"; // Importa o serviço

interface CardItem {
  id: string;
  nome: string;
  valor: number;
  data: string;
}

export default function HomePage() {
  const { theme } = useThemeContext();
  const { salary } = useSettingsContext();
  const [cards, setCards] = useState<CardItem[]>([]);

  const salario = salary ?? 1000;

  const gasto = cards.reduce((total, item) => {
    const valor = typeof item.valor === "number" ? item.valor : parseFloat(String(item.valor));
    return total + (isNaN(valor) ? 0 : valor);
  }, 0);

  const saldo = salario - gasto;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const result = await getCards();
        setCards(result);
      } catch (error) {
        setCards([]); // fallback se erro
      }
    };

    fetchCards();
  }, []);

  return (
    <Container theme={theme}>
      <StatusMoney salario={salario} gasto={gasto} saldo={saldo} />
      <Line />
      <MyCards>
        {cards.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.nome}
            value={item.valor}
            date={item.data}
          />
        ))}
      </MyCards>
      <AlertInEnpty
        message="utilize esta area para dividas mensais"
        visible={cards.length === 0}
      />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  margin: 10px;
  padding: 10px;
`;

const MyCards = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;
`;
