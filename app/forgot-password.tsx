import React, { useState } from "react";
import styled from "styled-components/native";
import { useThemeContext } from "@/src/context/ThemeContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Erro", "Informe seu e-mail.");
      return;
    }

    try {
      setLoading(true);
      // Simulação de envio de e-mail
      await new Promise((res) => setTimeout(res, 1000));
      Alert.alert("Sucesso", "Instruções enviadas para seu e-mail.");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível recuperar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container theme={theme}>
      <Logo source={require("./../assets/images/adaptive-icon.png")} />
      <Title theme={theme}>Recuperar Senha</Title>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.text}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={theme}
      />

      <LoginButton onPress={handleResetPassword} disabled={loading} theme={theme}>
        <ButtonText theme={theme}>
          {loading ? "Enviando..." : "Enviar instruções"}
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

const Logo = styled.Image`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 80px;
  align-self: center;
`;