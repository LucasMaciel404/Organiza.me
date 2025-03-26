import styled from "styled-components/native";
import { useThemeContext } from "../ThemeContext";
import LogoutButton from "../components/Logout";

export default function ProfileScreen() {
  const { theme } = useThemeContext();
  return (
    <Container theme={theme}>
      <MainTitle theme={theme}>Sair</MainTitle>
      <LogoutButton>
        
      </LogoutButton>
    </Container>
  );
}
const Container = styled.View`
  flex: 1; 
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const MainTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;
