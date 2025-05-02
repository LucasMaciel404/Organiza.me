import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useThemeContext } from "@/src/context/ThemeContext";
import { useLogin } from "./../src/hooks/useLogin";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, loading, handleLogin } = useLogin();
  const { theme } = useThemeContext();
  const router = useRouter();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Container theme={theme}>
      <Logo source={require("./../assets/images/adaptive-icon.png")} />

      <Content>
        <Title theme={theme}>Simples</Title>

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
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.colors.text}
        />

        <LoginButton onPress={handleLogin} theme={theme} disabled={loading}>
          <ButtonText theme={theme}>
            {loading ? "Entrando..." : "Entrar"}
          </ButtonText>
        </LoginButton>

        <LinksContainer>
          <StyledLink onPress={() => router.push("/forgot-password")}>
            <LinkText>Esqueci minha senha</LinkText>
          </StyledLink>
          <StyledLink onPress={() => router.push("/register")}>
            <LinkText> Cadastre-se</LinkText>
          </StyledLink>
        </LinksContainer>
      </Content>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 50px;
  font-family: "Caveat-Regular";
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 40px;
`;

const Logo = styled.Image`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 80px;
  align-self: center;
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
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.surface};
  font-size: 18px;
  font-weight: bold;
`;

const LinksContainer = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;

`;

const StyledLink = styled(TouchableOpacity)`
  margin-top: 12px;
`;

const LinkText = styled(Text)`
  color: #3b82f6; /* Azul moderno (Tailwind blue-500) */
  font-size: 16px;
  text-decoration: underline;
`;
