import { useState } from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { useThemeContext } from "../context/ThemeContext";
import { ModalComponent } from "./Modal";
import Input from "./Input";
import { useStorageContext } from "../context/StorangeContext";
import DateInput from "./DateInput";
import { createCard } from "./../services/cardService"; // <- Importa a função da API

export default function NewItem() {
  const { theme } = useThemeContext();
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState<Date | undefined>(new Date());

  const { addItem } = useStorageContext();

  const handleSave = async () => {
    if (!nome || !valor || !data) return;

    const parsedValor = parseFloat(valor.replace(',', '.'));
    const formattedData = data.toISOString();

    try {
      // Salva na API
      const savedCard = await createCard(nome, formattedData, parsedValor);

      // Salva no contexto/local storage
      const item = {
        id: savedCard.id || uuidv4(),
        nome,
        valor: parsedValor,
        data: formattedData,
      };

      addItem(item);

      // Limpa o formulário e fecha o modal
      setModalVisible(false);
      setNome("");
      setValor("");
      setData(new Date());
    } catch (error) {
      console.error("Erro ao salvar item:", error);
      // Aqui você pode usar um Toast/Alert se quiser
    }
  };

  return (
    <>
      <Conteiner theme={theme} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name="pencil-plus"
          size={28}
          color={theme.colors.surface}
        />
      </Conteiner>

      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Input placeholder="Nome da conta" value={nome} onChange={setNome} />
        <Input
          placeholder="Valor da conta"
          value={valor}
          onChange={setValor}
          keyboardType="numeric"
        />
        <DateInput
          value={data}
          onChange={setData}
          placeholder="Data da conta"
        />
        <Button title="Salvar" onPress={handleSave} />
      </ModalComponent>
    </>
  );
}

const Conteiner = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.accent};
  border: 1px solid ${(props) => props.theme.card.text};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  right: 30px;
`;
