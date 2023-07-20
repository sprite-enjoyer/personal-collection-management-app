import { createContext } from "react";
import RoutesManager from "./components/RoutesManager";
import { routeBaseStyles } from "./misc/styleUtils";
import GlobalUserInfoStore from "./stores/GlobalUserInfoStore";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider as CustomThemeProvider } from "./misc/theme";
import LanguageProvider from "./misc/language";
import { ScreenSizeProvider } from "./misc/screenSize";

const globalUserInfoStore = new GlobalUserInfoStore();
export const GlobalUserInfoStoreContext = createContext(globalUserInfoStore);

const App = () => {
  return (
    <Box style={routeBaseStyles}>
      <GlobalUserInfoStoreContext.Provider value={globalUserInfoStore}>
        <CustomThemeProvider>
          <CssBaseline />
          <LanguageProvider>
            <ScreenSizeProvider>
              <RoutesManager />
            </ScreenSizeProvider>
          </LanguageProvider>
        </CustomThemeProvider>
      </GlobalUserInfoStoreContext.Provider>
    </Box>
  );
};

export default App;
