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

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addItem } = useStorageContext();

  const handleSave = async () => {
    if (!name || !value || !date) return;

    const parsedValue = parseFloat(value.replace(',', '.'));
    const formattedDate = date.toISOString();

    try {
      // Salva na API
      const savedCard = await createCard(name, formattedDate, parsedValue);

      // Salva no contexto/local storage
      const item = {
        id: savedCard.id || uuidv4(),
        name,
        value: parsedValue,
        date: formattedDate,
      };

      addItem(item);

      // Limpa o formulário e fecha o modal
      setModalVisible(false);
      setName("");
      setValue("");
      setDate(new Date());
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
        <Input placeholder="Nome da conta" value={name} onChange={setName} />
        <Input
          placeholder="Valor da conta"
          value={value}
          onChange={setValue}
          keyboardType="numeric"
        />
        <DateInput
          value={date}
          onChange={setDate}
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
