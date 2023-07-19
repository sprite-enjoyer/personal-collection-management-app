import { PaletteMode, createTheme, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "./theme";

const useColorTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");
  const toggleColorMode = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const modifiedTheme = useMemo(() => {
    return createTheme(getDesignTokens(mode));
  }, [mode]);

  return {
    theme: modifiedTheme,
    toggleColorMode,
    mode,
  };
};

export default useColorTheme;
