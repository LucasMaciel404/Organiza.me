import { useState } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";
import OptionsModal from "../components/OptionsModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ProfileScreen() {
  const { theme } = useThemeContext();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container theme={theme}>
      <OpenModalButton onPress={() => setModalVisible(true)} theme={theme}>
        <MaterialCommunityIcons
          name="cog-outline"
          size={24}
          color={theme.colors.text}
          style={{ marginRight: 10 }}
        />
        <OpenModalText theme={theme}>Abrir opções</OpenModalText>
      </OpenModalButton>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: center;
  padding-top: 40px;
  background-color: ${(props) => props.theme.colors.background};
`;

const OpenModalButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.text};
`;

const OpenModalText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;
