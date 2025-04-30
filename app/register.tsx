import React, { useState } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useThemeContext } from "@/src/context/ThemeContext";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      // Simulação de cadastro
      await new Promise((res) => setTimeout(res, 1000));
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container theme={theme}>
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

      <LoginButton onPress={handleRegister} disabled={loading} theme={theme}>
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
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
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
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.surface};
  font-size: 18px;
  font-weight: bold;
`;
