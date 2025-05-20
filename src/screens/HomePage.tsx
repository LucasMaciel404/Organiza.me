import { useThemeContext } from "../context/ThemeContext";
import styled from "styled-components/native";
import StatusMoney from "../components/Status";
import Line from "../components/Line";
import Card from "../components/CardItem";
import { useSettingsContext } from "../context/SettingsContext";
import AlertInEnpty from "../components/AlertInEnpty";
import { useEffect, useState } from "react";
import { getCards } from "./../services/cardService";
import { useStorageContext, ItemProps } from "../context/StorangeContext";

interface CardItem {
  id: string;
  nome: string;
  valor: number;
  data: string;
}

export default function HomePage() {
  const { theme } = useThemeContext();
  const { salary } = useSettingsContext();
  const { data: storedCards } = useStorageContext();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  const salario = salary ?? 1000;

  const cleanAndFormatCards = (cards: any[]): CardItem[] => {
    return cards
      .filter(
        (item) =>
          item &&
          typeof item.id !== "undefined" &&
          typeof item.nome === "string" &&
          item.valor !== undefined &&
          typeof item.data === "string"
      )
      .map((item) => ({
        id: String(item.id),
        nome: item.nome,
        valor: Number(item.valor) || 0,
        data: item.data,
      }));
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const apiCards = await getCards();
        const formattedApiCards = Array.isArray(apiCards) ? cleanAndFormatCards(apiCards) : [];

        // Unir cards da API e do StorageContext, evitando duplicados pelo id
        const allCardsMap = new Map<string, CardItem>();

        formattedApiCards.forEach((card) => allCardsMap.set(card.id, card));
        storedCards.forEach((card) => allCardsMap.set(card.id, card));

        const combinedCards = Array.from(allCardsMap.values());

        setCards(combinedCards);
      } catch (error) {
        console.error("Erro ao buscar cards:", error);
        setCards(storedCards.length ? storedCards : []);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [storedCards]);

  const gasto = cards.reduce((total, item) => {
    return total + (isNaN(item.valor) ? 0 : item.valor);
  }, 0);

  const saldo = salario - gasto;

  if (loading) {
    return null; // Ou um componente de loading
  }

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
