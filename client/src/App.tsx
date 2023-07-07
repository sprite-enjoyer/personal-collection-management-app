import { createContext } from "react";
import RoutesManager from "./components/RoutesManager";
import { routeBaseStyles } from "./misc/styleUtils";
import GlobalUserInfoStore from "./stores/GlobalUserInfoStore";

const globalUserInfoStore = new GlobalUserInfoStore();
export const GlobalUserInfoStoreContext = createContext(globalUserInfoStore);

const App = () => {
  return (
    <div style={routeBaseStyles}>
      <GlobalUserInfoStoreContext.Provider value={globalUserInfoStore}>
        <RoutesManager />
      </GlobalUserInfoStoreContext.Provider>
    </div>
  );
};

export default App;
