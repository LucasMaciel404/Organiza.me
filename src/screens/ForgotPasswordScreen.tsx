import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import Input from "../components/Input";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      Alert.alert("Erro", "Informe seu e-mail.");
      return;
    }

    // TODO: lógica para resetar senha
    Alert.alert("Sucesso", "Instruções enviadas para seu e-mail.");
  };

  return (
    <Container>
      <Title>Recuperar Senha</Title>
      <Input placeholder="E-mail" value={email} onChange={setEmail} keyboardType="email-address" />
      <LoginButton onPress={handleReset}>
        <ButtonText>Enviar</ButtonText>
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
