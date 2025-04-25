import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsContextProps {
  salary: number;
  setSalary: (value: number) => void;
}

const SettingsContext = createContext<SettingsContextProps>({} as SettingsContextProps);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [salary, setSalaryState] = useState<number>(1000);
  const storageKey = "@userSettings";

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.salary !== undefined) {
            setSalaryState(parsed.salary);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    loadSettings();
  }, []);

  const setSalary = async (value: number) => {
    setSalaryState(value);
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify({ salary: value }));
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ salary, setSalary }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
