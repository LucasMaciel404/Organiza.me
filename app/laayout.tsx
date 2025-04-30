import { ThemeToggleButton } from "@/src/components/ToggleTheme";
import { useThemeContext } from "@/src/context/ThemeContext";
import { ReactNode } from "react";
import styled from "styled-components/native";

export default function Layout({ children }: { children: ReactNode }) {
  const { theme } = useThemeContext();

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <Title theme={theme}>Simples</Title>
        {/* <ThemeToggleButton /> */}
      </Header>

      {children}
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;
const Header = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
/* 

  shadow-color: ${(props) => props.theme.colors.text};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.8;
  shadow-radius: 3px;
  elevation: 3;
  
  margin: 10px;
  padding: 10px;
  border-radius: 10px; */

const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 40px;

  font-family: "Caveat-Regular";
`;
