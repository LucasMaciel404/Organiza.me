import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useThemeContext } from "@/src/ThemeContext";
import { useLogin } from "./../src/hooks/useLogin"; // Importando o hook

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, loading, handleLogin } = useLogin();
  const { theme } = useThemeContext();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Container theme={theme}>
      <Title theme={theme}>Login</Title>
      <Input
        theme={theme}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.text}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        theme={theme}
        placeholder="Senha"
        value={password}
        placeholderTextColor={theme.colors.text}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoginButton onPress={handleLogin} theme={theme} disabled={loading}>
        <ButtonText theme={theme}>
          {loading ? "Entrando..." : "Entrar"}
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
  font-size: 28px;
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
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.surface};
  font-size: 18px;
  font-weight: bold;
`;
