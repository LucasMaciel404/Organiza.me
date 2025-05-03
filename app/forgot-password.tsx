import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useThemeContext } from "@/src/context/ThemeContext";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useForgotPassword } from "./../src/hooks/useForgotPassword";

export default function ForgotPasswordScreen() {
  const { email, setEmail, loading, handleResetPassword } = useForgotPassword();
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Container theme={theme}>
      <Logo source={require("./../assets/images/adaptive-icon.png")} />

      <Content>
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

        <LinksContainer>
          <StyledLink onPress={() => router.replace("/login")}>
            <LinkText>Voltar para login</LinkText>
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
  font-size: 40px;
  font-family: "Caveat-Regular";
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 40px;
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

const Logo = styled.Image`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 80px;
  align-self: center;
`;

const LinksContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

const StyledLink = styled(TouchableOpacity)`
  margin-top: 12px;
`;

const LinkText = styled(Text)`
  color: #3b82f6;
  font-size: 16px;
  text-decoration: underline;
`;
