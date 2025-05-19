import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.7:3000/cards",
  timeout: 3000, // 3s
});

const getAuthHeader = async () => {
  const userData = await SecureStore.getItemAsync("user_data");
  if (!userData) throw new Error("Usuário não autenticado");

  const { access_token } = JSON.parse(userData);
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

// Criar novo card
export const createCard = async (nome: string, data: string, valor: number) => {
  try {
    const config = await getAuthHeader();
    const response = await api.post("/", { nome, data, valor }, config);
    return response.data;
  } catch (error) {
    handleRequestError(error, "criar");
  }
};

// Buscar todos os cards
export const getCards = async () => {
  try {
    const config = await getAuthHeader();
    const response = await api.get("/", config);
    return response.data;
  } catch (error) {
    handleRequestError(error, "buscar");
  }
};

// Atualizar card
export const updateCard = async (id: string, updates: { nome?: string; data?: string; valor?: number }) => {
  try {
    const config = await getAuthHeader();
    const response = await api.patch(`/${id}`, updates, config);
    return response.data;
  } catch (error) {
    handleRequestError(error, "atualizar");
  }
};

// Deletar card
export const deleteCard = async (id: string) => {
  try {
    const config = await getAuthHeader();
    const response = await api.delete(`/${id}`, config);
    return response.data;
  } catch (error) {
    handleRequestError(error, "deletar");
  }
};

// Função para tratar erro
const handleRequestError = (error: any, acao: string) => {
  if (error.code === "ECONNABORTED") {
    alert(`Tempo limite excedido ao ${acao} card`);
  } else {
    alert(error.response?.data?.message || `Erro ao ${acao} card: Realize login novamente`);
    router.replace("/login");
  }
  throw new Error(error.response?.data?.message || `Erro ao ${acao} card`);
};
