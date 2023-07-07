import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/ProfilePage";
import CollectionPage from "../pages/CollectionPage";
import { useContext } from "react";
import { GlobalUserInfoStoreContext } from "../App";
import CollectionPageStore from "../stores/CollectionPageStore";

const RoutesManager = () => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
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
          loader={async () => await globalUserInfoStore.checkJWTAndSetUserStatus()}
          element={<ProfilePage />}
        />
        <Route
          path="/collection/:collectionID"
          loader={async ({ params }) => {
            await globalUserInfoStore.checkJWTAndSetUserStatus();
            const { collectionID } = params;
            if (!collectionID) return Promise.reject("collection ID not provided!");
            const collection = await CollectionPageStore.fetchCollection(collectionID);
            const userName = await CollectionPageStore.fetchUserName(collection.owner);
            return Promise.resolve({ collection, userName });
          }}
          element={<CollectionPage />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default RoutesManager;
