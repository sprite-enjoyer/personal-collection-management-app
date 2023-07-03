import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/ProfilePage";
import CollectionPage from "../pages/CollectionPage";

const RoutesManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              adminRequired
              redirectPath="/login"
            />
          }>
          <Route
            path="/admin"
            element={<AdminPage />}
          />
        </Route>
        <Route
          path="/user/:userName"
          element={<ProfilePage />}
        />
        <Route
          path="/collection/:collectionID"
          element={<CollectionPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesManager;
