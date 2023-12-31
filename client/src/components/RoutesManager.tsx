import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect } from "react";
import { GlobalUserInfoStoreContext } from "../App";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemPageStore from "../stores/ItemPageStore";
import MainPage, { fetchAllTags, fetchLargestCollection, fetchLatestItems } from "../pages/MainPage";
import Header from "./Header";
import ProfilePageStore from "../stores/ProfilePageStore";
import ErrorComponent from "./ErrorComponent";
import Custom404 from "./Custom404";
import UserBlocked from "./UserBlocked";

const LazyLoginPage = lazy(async () => await import("../pages/LoginPage"));
const LazyRegisterPage = lazy(async () => await import("../pages/RegisterPage"));
const LazyAdminPage = lazy(async () => await import("../pages/AdminPage"));
const LazyProfilePage = lazy(async () => await import("../pages/ProfilePage"));
const LazyCollectionPage = lazy(async () => await import("../pages/CollectionPage"));
const LazyItemPage = lazy(async () => await import("../pages/ItemPage"));

const RoutesManager = () => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Header />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={null}>
                <LazyLoginPage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={null}>
                <LazyRegisterPage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/"
            element={<MainPage />}
            loader={async () => {
              if (!globalUserInfoStore.user && !globalUserInfoStore.userChecked)
                await globalUserInfoStore.checkJWTAndSetUserStatus();
              const latestItems = fetchLatestItems();
              const largestCollections = fetchLargestCollection();
              const tags = fetchAllTags();
              return await Promise.all([latestItems, largestCollections, tags]);
            }}
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/item/:itemID"
            loader={async ({ params }) => {
              if (!globalUserInfoStore.user && !globalUserInfoStore.userChecked)
                await globalUserInfoStore.checkJWTAndSetUserStatus();
              const { itemID } = params;
              if (!itemID) return Promise.reject("item ID not provided!");
              if (globalUserInfoStore.user?.blocked) return redirect("/blocked");

              const item = await ItemPageStore.fetchItem(itemID);
              const userName = await CollectionPageStore.fetchUserName(item.owner);
              const collection = await CollectionPageStore.fetchCollection(item.containerCollection);
              return Promise.resolve({ item, userName, collection });
            }}
            element={
              <Suspense fallback={null}>
                <LazyItemPage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/admin"
            loader={async () => {
              if (!globalUserInfoStore.user && !globalUserInfoStore.userChecked)
                await globalUserInfoStore.checkJWTAndSetUserStatus();
              if (globalUserInfoStore.user?.blocked) return redirect("/blocked");

              if (!globalUserInfoStore.user?.isAdmin) return redirect("/login");
              return null;
            }}
            element={
              <Suspense fallback={null}>
                <LazyAdminPage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/user/:userName"
            loader={async ({ params }) => {
              if (!globalUserInfoStore.user && !globalUserInfoStore.userChecked)
                await globalUserInfoStore.checkJWTAndSetUserStatus();
              if (globalUserInfoStore.user?.blocked) return redirect("/blocked");

              const { userName } = params as { userName: string };
              if (!userName) return Promise.resolve({ collections: [] });
              const collections = await ProfilePageStore.fetchCollections(userName);
              return Promise.resolve({ collections });
            }}
            element={
              <Suspense fallback={null}>
                <LazyProfilePage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/collection/:collectionID"
            loader={async ({ params }) => {
              if (!globalUserInfoStore.user && !globalUserInfoStore.userChecked)
                await globalUserInfoStore.checkJWTAndSetUserStatus();
              if (globalUserInfoStore.user?.blocked) return redirect("/blocked");

              const { collectionID } = params;
              if (!collectionID) return Promise.reject("collection ID not provided!");
              const collection = await CollectionPageStore.fetchCollection(collectionID);
              const userName = await CollectionPageStore.fetchUserName(collection.owner);
              return Promise.resolve({ collection, userName });
            }}
            element={
              <Suspense fallback={null}>
                <LazyCollectionPage />
              </Suspense>
            }
            errorElement={<ErrorComponent />}
          />
          <Route
            path="/blocked"
            element={<UserBlocked />}
            errorElement={<ErrorComponent />}
          />
          <Route
            path="*"
            element={<Custom404 />}
          />
        </Route>
      </>
    )
  );
  return globalUserInfoStore.user?.blocked ? null : <RouterProvider router={router} />;
};

export default RoutesManager;
