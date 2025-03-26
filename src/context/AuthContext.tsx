import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { login } from "../services/authService";

type User = {
  id: string;
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Agora a chave é válida
        const userData = await SecureStore.getItemAsync("user_data");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      }
    };
    loadUser();
  }, []);

  // const signIn = async (email: string, password: string) => {
  //   const data = await login(email, password);
  //   setUser(data);
  //   await SecureStore.setItemAsync("user_data", JSON.stringify(data));
  // };
  
  const signIn = async (email: string, password: string) => {
    try {
      // Falso positivo: sempre retorna dados fictícios, mesmo que o login não tenha sido bem-sucedido.
      const data = { id: "ficticio-id", email, token: "ficticio-token" }; // Dados simulados

      // Atualizando o estado do usuário
      setUser(data);

      // Armazenando os dados fictícios no SecureStore de forma segura
      await SecureStore.setItemAsync("user_data", JSON.stringify(data));

      // Simulando uma mensagem de sucesso
      console.log("Usuário logado com sucesso (falso positivo)");
    } catch (error) {
      console.error("Erro durante o login", error);
    }
  };

  const signOut = async () => {
    try {
      // Remove os dados do usuário do SecureStore
      await SecureStore.deleteItemAsync("user_data");
      setUser(null);
    } catch (error) {
      console.error("Erro ao deslogar", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
