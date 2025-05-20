import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.0.7:3000/cards";

interface Card {
  id?: string;
  nome: string;
  data: string;
  valor: number;
}

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

export const createCard = async (
  nome: string,
  data: string,
  valor: number
): Promise<Card> => {
  try {
    const config = await getAuthHeader();
    const response = await axios.post(API_URL, { nome, data, valor }, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao criar card");
  }
};

export const getCards = async (): Promise<Card[]> => {
  try {
    const config = await getAuthHeader();
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao buscar cards");
  }
};

export const updateCard = async (
  id: string,
  updates: Partial<Card>
): Promise<Card> => {
  try {
    const config = await getAuthHeader();
    const response = await axios.patch(`${API_URL}/${id}`, updates, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao atualizar card");
  }
};

export const deleteCard = async (id: string): Promise<void> => {
  try {
    const config = await getAuthHeader();
    await axios.delete(`${API_URL}/${id}`, config);
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao deletar card");
  }
};