import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRouteProps {
  redirectPath: string;
  adminRequired: boolean;
}

const ProtectedRoute = ({ redirectPath = "/", adminRequired = false }: ProtectedRouteProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkJWT = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/checkJWT`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ justCheck: true }),
      });

      const { userID, blocked, isAdmin }: { userID: string; blocked: boolean; isAdmin: boolean } =
        await response.json();

      if ((!blocked || userID) && (adminRequired ? isAdmin : true)) setAuthenticated(true);
    };

    checkJWT().then(() => setLoaded(true));
  }, []);

  if (!loaded) return <h1>Loading....</h1>;
  return authenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
