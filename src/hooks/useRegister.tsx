import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./../context/AuthContext";

export const useRegister = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password)
        .then((res: boolean) => {
          if (res === true) {
            // Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
            router.replace("/"); // ou redirecione para tela de login, ex: router.push("/login")
          } else {
            Alert.alert("Erro", "Não foi possível realizar o cadastro.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error: any) {
      Alert.alert("Erro", "Houve um erro ao realizar o cadastro.");
    }
    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleRegister,
  };
};
