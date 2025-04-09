import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ModalComponent } from "./Modal";
import { useThemeContext } from "../ThemeContext";
import { useSettingsContext } from "./../context/SettingsContext";
import { Feather } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function OptionsModal({ visible, onClose }: Props) {
  const { theme } = useThemeContext();
  const { salary, setSalary } = useSettingsContext();
  const [localSalary, setLocalSalary] = useState(String(salary ?? ""));

  useEffect(() => {
    setLocalSalary(String(salary ?? ""));
  }, [salary, visible]);

  const handleSalaryChange = () => {
    const sanitizedInput = localSalary.replace(",", "."); // substitui vírgula por ponto
    const numericSalary = parseFloat(sanitizedInput);
    if (!isNaN(numericSalary)) {
      setSalary(numericSalary);
      onClose();
    } else {
      alert("Digite um valor numérico válido.");
    }
  };

  const placeholderValue =
    salary === undefined || salary === null
      ? "Valor não definido"
      : `R$ ${String(salary).replace(".", ",")}`; // exibe vírgula no placeholder se houver

  return (
    <ModalComponent visible={visible} onClose={onClose}>
      <ModalContent>
        <CloseIconContainer onPress={onClose}>
          <Feather name="x" size={24} color={theme.colors.text} />
        </CloseIconContainer>

        <LabelText theme={theme}>Salário atual</LabelText>
        <SalaryInput
          value={localSalary}
          onChangeText={setLocalSalary}
          keyboardType="numeric"
          placeholder={placeholderValue}
        />
        <SaveButton title="Salvar salário" onPress={handleSalaryChange} />
      </ModalContent>
    </ModalComponent>
  );
}

const ModalContent = styled.View`
  padding: 20px;
  gap: 15px;
  position: relative;
`;

const CloseIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0px;
  z-index: 10;
`;

const LabelText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

const SalaryInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
`;

const SaveButton = styled.Button``;
