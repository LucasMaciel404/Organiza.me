import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export function useSecureStore(key: string) {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const storedValue = await SecureStore.getItemAsync(key);
      setValue(storedValue);
      setLoading(false);
    };

    load();
  }, [key]);

  const save = async (newValue: string) => {
    await SecureStore.setItemAsync(key, newValue);
    setValue(newValue);
  };

  const remove = async () => {
    await SecureStore.deleteItemAsync(key);
    setValue(null);
  };

  return { value, loading, save, remove };
}
