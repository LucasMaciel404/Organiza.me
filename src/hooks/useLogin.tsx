import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./../context/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password)
        .then((res: boolean) => {
          if (res === true) {
            // Alert.alert("Sucesso", "Login realizado com sucesso.");
            router.replace("/");
          } else {
            Alert.alert("Erro", "Usuário ou senha incorretos.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error: any) {
      Alert.alert("Erro", "Houve um erro ao realizar o login.");
    }
    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};
