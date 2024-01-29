import React from "react";

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

export const DarkModeContext = React.createContext({
  theme: themeList.light,
  setTheme: (themeName: ThemeName): void => {},
});
