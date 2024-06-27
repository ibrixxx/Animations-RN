import React, { ReactNode, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

// Define the type for the context value
interface ThemeContextType {
  theme: ColorSchemeName;
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
}

// Create the context with the defined type
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = useState<ColorSchemeName>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
