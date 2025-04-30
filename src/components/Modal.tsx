import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import styled from 'styled-components/native';
import { useThemeContext } from '../context/ThemeContext'; // Ajuste o caminho conforme necessário

type ModalComponentProps = {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  children: React.ReactNode;
};

export function ModalComponent({ visible, onClose, children }: ModalComponentProps) {
  const { theme } = useThemeContext();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Overlay>
          <TouchableWithoutFeedback>
            <ModalContent theme={theme}>
              {children}
            </ModalContent>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// Styled components
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 85%;
  background-color: ${(props) => props.theme.colors.background};
  padding: 24px;
  border-radius: 12px;
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
`;
