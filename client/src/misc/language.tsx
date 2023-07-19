import { ReactNode, createContext, useState } from "react";

const LanguageContext = createContext({
  language: "English",
  setLanguage: (val: string) => {},
});

interface LangugaeProviderProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LangugaeProviderProps) => {
  const [language, setLanguage] = useState("English");

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
