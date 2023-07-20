import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import englishTexts from "./englishTexts";
import georgianTexts from "./georgianTexts";

export const LanguageContext = createContext({
  language: "English",
  setLanguage: (val: string) => {},
  staticTextObject: englishTexts,
});

interface LangugaeProviderProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LangugaeProviderProps) => {
  const [language, setLanguage] = useState("English");
  const [staticTextObject, setStaticTextObject] = useState(englishTexts);

  useEffect(() => {
    if (language === "ქართული") setStaticTextObject(georgianTexts);
    else setStaticTextObject(englishTexts);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, staticTextObject }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export default LanguageProvider;
