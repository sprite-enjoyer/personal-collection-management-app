import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/ProfilePage";
import CollectionPage from "../pages/CollectionPage";
import { useContext } from "react";
import { GlobalUserInfoStoreContext } from "../App";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemPageStore from "../stores/ItemPageStore";
import ItemPage from "../pages/ItemPage";
import MainPage, { fetchAllTags, fetchLargestCollection, fetchLatestItems } from "../pages/MainPage";

const RoutesManager = () => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<MainPage />}
          loader={async () => {
            if (!globalUserInfoStore.loggedIn) await globalUserInfoStore.checkJWTAndSetUserStatus();
            const latestItems = fetchLatestItems();
            const largestCollections = fetchLargestCollection();
            const tags = fetchAllTags();
            return await Promise.all([latestItems, largestCollections, tags]);
          }}
        />
        <Route
          path="/item/:itemID"
          loader={async ({ params }) => {
            if (!globalUserInfoStore.loggedIn) await globalUserInfoStore.checkJWTAndSetUserStatus();
            const { itemID } = params;
            if (!itemID) return Promise.reject("item ID not provided!");
            const item = await ItemPageStore.fetchItem(itemID);
            const userName = await CollectionPageStore.fetchUserName(item.owner);
            const collection = await CollectionPageStore.fetchCollection(item.containerCollection);
            return Promise.resolve({ item, userName, collection });
          }}
          element={<ItemPage />}
        />
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
          loader={async () => {
            if (!globalUserInfoStore.loggedIn) await globalUserInfoStore.checkJWTAndSetUserStatus();
            return null;
          }}
          element={<AdminPage />}
        />
        <Route
          path="/user/:userName"
          loader={async () => {
            if (!globalUserInfoStore.loggedIn) await globalUserInfoStore.checkJWTAndSetUserStatus();
            return null;
          }}
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
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default RoutesManager;
