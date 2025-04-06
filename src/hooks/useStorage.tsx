import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<any[]>([]);

  // Salvar um novo item no array existente
  const saveData = async (newItem: any) => {
    try {
      const existing = await getData();
      const updated = [...existing, newItem];
      await AsyncStorage.setItem(key, JSON.stringify(updated));
      setStoredValue(updated);
      console.log("Dados salvos:", updated);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Recuperar os dados salvos
  const getData = async (): Promise<any[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : [];
      setStoredValue(value); 
      return value;
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      return [];
    }
  };

  // Remover item pelo índice
  const removeItem = async (indexToRemove: number) => {
    try {
      const existing = await getData();
      const updated = existing.filter((_, index) => index !== indexToRemove);
      await AsyncStorage.setItem(key, JSON.stringify(updated));
      setStoredValue(updated);
      console.log("Item removido:", indexToRemove);
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  // Remover todos os dados
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue([]);
      console.log("Todos os dados foram removidos!");
    } catch (error) {
      console.error("Erro ao limpar dados:", error);
    }
  };

  return { storedValue, saveData, getData, removeData, removeItem };
};
