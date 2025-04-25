import React from "react";
import { TouchableOpacity } from "react-native"; // Usamos TouchableOpacity para tornar o ícone clicável
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones do Expo
import { useRouter } from "expo-router"; // Hook para navegação
import { useAuth } from "@/src/context/AuthContext"; // Hook para acessar o contexto de autenticação
import { useThemeContext } from "@/src/context/ThemeContext"; // Hook para acessar o contexto de tema

const LogoutButton = () => {
  const { signOut } = useAuth(); // Hook para o contexto de autenticação
  const { theme } = useThemeContext(); // Acessa o tema do contexto
  const router = useRouter(); // Hook para navegação

  const handleLogout = async () => {
    await signOut(); // Realiza o logout
    router.replace("/login"); // Redireciona para a página de login
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
      <Ionicons
        name="log-out" // Ícone de saída
        size={30} // Tamanho do ícone
        color={theme.colors.theme === "dark" ? "#fff" : "#000"} // Cor do ícone com base no tema
      />
    </TouchableOpacity>
  );
};

export default LogoutButton;
