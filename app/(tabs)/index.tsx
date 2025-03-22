import { Buttom } from "@/src/components/Buttom";
import { useThemeContext } from "@/src/ThemeContext";
import { Text } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View<{ theme: { colors: { background: string } } }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export default function HomePage() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Container theme={theme}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Relaxa amigo</Text>
        <Buttom theme={theme} title="Trocar Tema" onPress={toggleTheme} />
      </View>
    </Container>
  );
}
