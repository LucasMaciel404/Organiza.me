import React, { useState } from "react";
import { View, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";

type DateInputProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
};

export default function DateInput({
  value,
  onChange,
  placeholder,
}: DateInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const { theme } = useThemeContext();

  const handleConfirm = (date: Date) => {
    setIsVisible(false);
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <View>
      <DateTouchable onPress={() => setIsVisible(true)} theme={theme}>
        <DateText isPlaceholder={!selectedDate} theme={theme}>
          {selectedDate
            ? selectedDate.toLocaleDateString("pt-BR")
            : placeholder || "Selecionar data"}
        </DateText>
      </DateTouchable>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        date={selectedDate || new Date()}
        display={Platform.OS === "ios" ? "inline" : "default"}
      />
    </View>
  );
}

const DateTouchable = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  justify-content: center;
  border-radius: 8px;
  font-size: 16px;
`;

const DateText = styled.Text<{ isPlaceholder: boolean }>`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;
