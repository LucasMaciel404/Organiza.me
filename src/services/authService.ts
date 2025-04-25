import axios from "axios";

const API_URL = "https://seu-servidor.com/api"; // Troque pelo seu backend

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data; // Retorna os dados do usuário e token
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao fazer login");
  }
};
