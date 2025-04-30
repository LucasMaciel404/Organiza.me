import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import Input from "../components/Input";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    // TODO: lógica de cadastro
    Alert.alert("Sucesso", "Conta criada!");
  };

  return (
    <Container>
      <Title>Cadastrar</Title>
      <Input placeholder="E-mail" value={email} onChange={setEmail} keyboardType="email-address" />
      <Input placeholder="Senha" value={password} onChange={setPassword} secureTextEntry />

      <LoginButton onPress={handleRegister}>
        <ButtonText>Cadastrar</ButtonText>
      </LoginButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
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
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
