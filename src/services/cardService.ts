import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.0.2.2:3000/cards";

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
    const response = await axios.post(API_URL, { nome, data, valor }, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    router.replace("/login");
    alert(err.response?.data?.message || "Erro ao criar card: Realize login novamente");
    throw new Error(err.response?.data?.message || "Erro ao criar card");
  }
};

// Buscar todos os cards do usuário logado
export const getCards = async () => {
  try {
    const config = await getAuthHeader();
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    router.replace("/login");
    alert(err.response?.data?.message || "Erro ao buscar cards: Realize login novamente");
    throw new Error(err.response?.data?.message || "Erro ao buscar cards");
  }
};

// Atualizar um card
export const updateCard = async (id: string, updates: { nome?: string; data?: string; valor?: number }) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.patch(`${API_URL}/${id}`, updates, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    router.replace("/login"); 
    alert(err.response?.data?.message || "Erro ao atualizar card: Realize login novamente");
    throw new Error(err.response?.data?.message || "Erro ao atualizar card");
  }
};

// Deletar um card
export const deleteCard = async (id: string) => {
  try {
    const config = await getAuthHeader();
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    router.replace("/login");
    alert(err.response?.data?.message || "Erro ao deletar card: Realize login novamente");
    throw new Error(err.response?.data?.message || "Erro ao deletar card");
  }
};
