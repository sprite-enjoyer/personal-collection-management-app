import { useMediaQuery } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";

export const ScreenSizeContext = createContext<{ userHasSmallScreen: boolean }>({ userHasSmallScreen: false });

interface ScreenSizeProviderProps {
  children: ReactNode;
}

export const ScreenSizeProvider = ({ children }: ScreenSizeProviderProps) => {
  const userHasSmallScreen = useMediaQuery("(max-width:1200px)");

  return (
    <ScreenSizeContext.Provider value={{ userHasSmallScreen: userHasSmallScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSizeContext = () => useContext(ScreenSizeContext);
