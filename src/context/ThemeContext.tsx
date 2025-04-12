import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "../theme";

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // "light" | "dark" | null
  const [theme, setTheme] = useState(
    systemColorScheme === "dark" ? DarkTheme : LightTheme
  );

  useEffect(() => {
    setTheme(systemColorScheme === "dark" ? DarkTheme : LightTheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LightTheme ? DarkTheme : LightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
