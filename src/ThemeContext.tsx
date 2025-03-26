import React, { createContext, useState, useContext } from 'react';
import { LightTheme, DarkTheme } from './theme';

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(LightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LightTheme ? DarkTheme : LightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para consumir o contexto
export const useThemeContext = () => {
  return useContext(ThemeContext);
};