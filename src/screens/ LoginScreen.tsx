import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "./../context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      Alert.alert("Sucesso", "Login realizado!");
    } catch (error : any) {
      Alert.alert("Erro", error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoginButton onPress={handleLogin} disabled={loading}>
        <ButtonText>{loading ? "Entrando..." : "Entrar"}</ButtonText>
      </LoginButton>
    </Container>
  );
}

// 🎨 Estilização com Styled Components
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

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #6200ea;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
