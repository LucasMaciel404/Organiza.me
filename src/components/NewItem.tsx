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

export default function NewItem() {
  const { theme } = useThemeContext();
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addItem } = useStorageContext();

  const handleSave = () => {
    if (!name || !value || !date) return;

    const item = {
      id: uuidv4(), // <- adiciona o ID aqui!
      name,
      value: parseFloat(value.replace(',', '.')),
      date: date.toString(), // Convert Date to string
    };

    addItem(item);

    // Limpa o formulário e fecha o modal
    setModalVisible(false);
    setName("");
    setValue("");
    setDate(new Date());
  };

  return (
    <>
      <Conteiner theme={theme} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name="pencil-plus"
          size={28}
          color={theme.card.text}
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
  background-color: ${(props) => props.theme.card.background};
  border: 1px solid ${(props) => props.theme.card.text};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  right: 30px;
`;
