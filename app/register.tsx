import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { useThemeContext } from "@/src/context/ThemeContext";
import { useRegister } from "@/src/hooks/useRegister"; // ajuste o caminho se necessário

export default function RegisterScreen() {
  const { theme } = useThemeContext();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleRegister,
  } = useRegister();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    await handleRegister(); // delega ao hook
  };

  return (
    <Container theme={theme}>
      <Logo source={require("./../assets/images/adaptive-icon.png")} />
      <Title theme={theme}>Criar conta</Title>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.text}
        theme={theme}
        autoCapitalize="none"
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        theme={theme}
      />

      <Input
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        theme={theme}
      />

      <LoginButton onPress={handleSubmit} disabled={loading} theme={theme}>
        <ButtonText theme={theme}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </ButtonText>
      </LoginButton>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  font-family: "Caveat-Regular";
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.border || "#ccc"};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.accent};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.surface};
  font-size: 18px;
  font-weight: bold;
`;

const Logo = styled.Image`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 80px;
  align-self: center;
`;
