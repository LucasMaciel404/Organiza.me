import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { login } from "../services/authService";

type User = {
  token: string | null;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
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

  const signIn = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      setUser({
        token: data.access_token || null,
      });
      await SecureStore.setItemAsync("user_data", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Erro durante o login", error);
      return false;
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
