import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";
import React, { useState } from "react";
import { ModalComponent } from "./Modal";
import Input from "./Input";
import { Button, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useStorageContext } from "../context/StorangeContext";

interface RequestCard {
  id: string;
  name: string;
  value: number;
  date: string;
  onDelete: () => void; // Adicione esta propriedade
}


export default function Card({ id, name, value, date }: RequestCard) {
  const { theme } = useThemeContext();
  const { removeItem, editItem } = useStorageContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedValue, setEditedValue] = useState(String(value));
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = async () => {
    if (!editedName || !editedValue || !editedDate) return;

    await editItem(id, {
      id,
      name: editedName,
      value: parseFloat(editedValue),
      date: editedDate,
    });

    setModalVisible(false);
  };

  const handleDelete = async () => {
    await removeItem(id);
  };

  return (
    <Container>
      <Item theme={theme}>
        <IconsRow>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="pencil" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </IconsRow>

        <Description colorText={theme.card.text}>{name}</Description>
        <Value colorText={theme.card.text}>${value}</Value>
        <DateText colorText={theme.card.text}>{date}</DateText>
      </Item>

      <ModalComponent visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Input placeholder="Nome" value={editedName} onChange={setEditedName} />
        <Input placeholder="Valor" value={editedValue} onChange={setEditedValue} keyboardType="numeric" />
        <Input placeholder="Data" value={editedDate} onChange={setEditedDate} />
        <Button title="Salvar alterações" onPress={handleSave} />
      </ModalComponent>
    </Container>
  );
}

const Container = styled.View`
  width: 48%;
`;

const Item = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.card.background};
  margin-bottom: 12px;
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 1px;
`;

const Description = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;

const Value = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;

const DateText = styled.Text<{ colorText: string }>`
  color: ${(props) => props.colorText};
`;

const IconsRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 5px;
`;
