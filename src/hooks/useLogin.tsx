import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./../context/AuthContext";
import { useStorageContext } from "./../context/StorangeContext"; // importa o contexto
import { getCards } from "./../services/cardService"; // importa função da API

export const useLogin = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const { clearAll, addItem } = useStorageContext(); // inclui métodos do storage

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
      const res = await signIn(email, password);

      if (res === true) {
        await clearAll(); // limpa o AsyncStorage/contexto

        const response = await getCards();
        const cards = Array.isArray(response) ? response : response.cards; // adaptável

        if (!Array.isArray(cards)) {
          throw new Error("Formato de dados inválido ao buscar cards");
        }

        for (const card of cards) {
          addItem({
            id: card.id!,
            nome: card.nome,
            data: card.data,
            valor: Number(card.valor), // garante que seja número
          });
        }

        router.replace("/");
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao realizar o login.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
