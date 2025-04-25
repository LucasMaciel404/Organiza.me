import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ItemProps {
  id: string;
  name: string;
  value: number;
  date: string;
}

interface StorageContextProps {
  data: ItemProps[];
  addItem: (item: ItemProps) => void;
  removeItem: (id: string) => void;
  editItem: (id: string, updatedItem: Partial<ItemProps>) => void;
  clearAll: () => void;
}

const StorageContext = createContext<StorageContextProps>({} as StorageContextProps);

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ItemProps[]>([]);
  const storageKey = "@userItems";

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          setData(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
        setData([]);
      }
    };

    loadStorageData();
  }, []);

  const updateStorage = async (newData: ItemProps[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  const addItem = (item: ItemProps) => {
    const updated = [...data, item];
    setData(updated);
    updateStorage(updated);
  };

  const removeItem = async (id: string) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    await updateStorage(updated);
  };

  const editItem = async (id: string, updatedItem: Partial<ItemProps>) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setData(updated);
    await updateStorage(updated);
  };

  const clearAll = () => {
    setData([]);
    AsyncStorage.removeItem(storageKey);
  };

  return (
    <StorageContext.Provider value={{ data, addItem, removeItem, editItem, clearAll }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => useContext(StorageContext);
