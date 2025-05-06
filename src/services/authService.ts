import axios from "axios";

const API_URL = "http://192.168.0.7:3000";

interface response {
  access_token: string;
  message: string;
  error: string;
  statusCode: number;
}

export const login = async (email: string,password: string): Promise<Partial<response>> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao fazer login");
  }
};

export const register = async (email: string, password: string): Promise<Partial<response>> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao fazer registro");
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/auth/recover`, {
      email: email
    }).then((res) => {
      if (res.status === 404) {
        throw new Error("Usuário não encontrado");
      }
    });
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Erro ao recuperar senha");
  }
};