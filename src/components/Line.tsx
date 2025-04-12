import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";

export default function Line() {
  const { theme } = useThemeContext();
  return <Divider theme={theme} />;
}

const Divider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.text};
  margin: 10px 0;
`;
