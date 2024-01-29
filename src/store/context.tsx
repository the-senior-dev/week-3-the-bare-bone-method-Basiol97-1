import React, { useState } from "react";

export enum ThemeName {
  LIGHT = "light",
  DARK = "dark",
}

export type Theme = {
  foreground: string;
  background: string;
  background_secondary: string;
};

export const themeList: Record<string, Theme> = {
  light: {
    foreground: "#2d3436",
    background: "#dfe6e9",
    background_secondary: "#ffffff",
  },
  dark: {
    foreground: "#dfe6e9",
    background: "#2d3436",
    background_secondary: "#636e72",
  },
};

// a way to store the state
export const DarkModeContext = React.createContext({
  theme: themeList.light,
  toggleTheme: (): void => {},
});

// Context Provider Props
interface DarkModeProviderProps {
  props?: React.HTMLProps<HTMLElement>;
  children?: React.ReactNode;
}

// our Context Provider that will wrap our app
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  // state is store here
  const [activeTheme, setActiveTheme] = useState(themeList.light);

  return (
    // State is broadcasted here by the provider
    <DarkModeContext.Provider
      value={{
        theme: activeTheme,
        toggleTheme: () => {
          if (activeTheme === themeList.dark) {
            setActiveTheme(themeList.light);
          } else {
            setActiveTheme(themeList.dark);
          }
        }
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
