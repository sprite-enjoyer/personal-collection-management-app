import RoutesManager from "./components/RoutesManager";
import { routeBaseStyles } from "./misc/styleUtils";

const App = () => {
  return (
    <div style={routeBaseStyles}>
      <RoutesManager />
    </div>
  );
};

export default App;
