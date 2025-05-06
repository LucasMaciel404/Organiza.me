import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "./../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import Input from "../components/Input";
import { useRouter } from "expo-router"; // ou useNavigation, dependendo da navegação que você usa

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      Alert.alert("Sucesso", "Login realizado!");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Input placeholder="E-mail" value={email} onChange={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input placeholder="Senha" value={password} onChange={setPassword} secureTextEntry />

      <LoginButton onPress={handleLogin} disabled={loading}>
        <ButtonText>{loading ? "Entrando..." : "Entrar"}</ButtonText>
      </LoginButton>

      <TextLink onPress={() => router.push("/forgot-password")}>Esqueci minha senha</TextLink>
      <TextLink onPress={() => router.push("/register")}>Cadastrar-se</TextLink>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #6200ea;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const TextLink = styled.Text`
  color: #6200ea;
  margin-top: 16px;
  font-size: 16px;

  text-decoration: none;
`;
