import { PaletteMode, Theme, ThemeOptions, createTheme } from "@mui/material";
import { ReactNode, createContext, useContext } from "react";
import useColorTheme from "./useColorTheme";

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const getDesignTokens = (mode: PaletteMode): ThemeOptions =>
  mode === "dark"
    ? {
        palette: {
          mode: "dark",
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: "#22272E",
            paper: "#22272E",
          },
          text: {
            primary: "rgba(255,255,255,0.85)",
            secondary: "rgba(255,255,255,0.5)",
          },
        },
      }
    : {
        palette: {
          mode: "light",
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        },
      };

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const value = useColorTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
