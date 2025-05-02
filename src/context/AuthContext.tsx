import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { login, register } from "../services/authService"; // importando a função de registro

type User = {
  token: string | null;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>; // novo método
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
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

  const signUp = async (email: string, password: string) => {
    try {
      const data = await register(email, password); // chamada para o serviço de registro
      setUser({
        token: data.access_token || null,
      });
      await SecureStore.setItemAsync("user_data", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Erro durante o cadastro", error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("user_data");
      setUser(null);
    } catch (error) {
      console.error("Erro ao deslogar", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
