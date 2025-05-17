import { useState } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "./../context/AuthContext";
import { useRouter } from "expo-router";
import OptionsModal from "../components/OptionsModal";

export default function ProfileScreen() {
  const { theme } = useThemeContext();
  const { signOut } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Meu Perfil</Title>

      <OptionButton onPress={() => setModalVisible(true)} theme={theme}>
        <MaterialCommunityIcons
          name="cash"
          size={28}
          color={theme.colors.primary}
          style={{ marginRight: 12 }}
        />
        <OptionText theme={theme}>Informar salário</OptionText>
      </OptionButton>

      <OptionButton onPress={handleLogout} theme={theme}>
        <MaterialCommunityIcons
          name="logout"
          size={28}
          color={theme.colors.primary}
          style={{ marginRight: 12 }}
        />
        <OptionText theme={theme}>Sair da conta</OptionText>
      </OptionButton>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 40px;
  font-family: "Poppins-Bold";
`;

const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 18px 20px;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.text};
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Verifique o suporte a box-shadow */
  elevation: 2; /* Para Android */
  transition: all 0.3s ease;

  &:active {
    transform: translateY(-2px);
  }
`;

const OptionText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  font-family: "Poppins-Regular";
`;
