import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<any>(null);

  // Salvar um valor no AsyncStorage
  const saveData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
      console.log("Dados salvos:", value);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Recuperar o valor armazenado
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStoredValue(value);
      return value;
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      return null;
    }
  };

  // Remover o valor armazenado
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
      console.log("Dados removidos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover dados:", error);
    }
  };

  return { storedValue, saveData, getData, removeData };
};
