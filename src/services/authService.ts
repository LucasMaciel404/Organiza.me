import axios from "axios";

const API_URL = "http://10.0.2.2:3000";

interface response {
  access_token: string;
  message: string,
  error: string,
  statusCode: number
}

export const login = async (email: string, password: string): Promise<Partial<response>> => {
  console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log(`${API_URL}/auth/login`);
  console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
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

