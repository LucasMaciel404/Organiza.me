import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { forgotPassword } from "../services/authService";

export const useForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Erro", "Informe seu e-mail.");
      return;
    }

    setLoading(true);

    try {
      // Simulação de envio de e-mail
      await forgotPassword(email);
      Alert.alert("Sucesso", "Instruções enviadas para seu e-mail.");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível recuperar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleResetPassword,
  };
};
