import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRouteProps {
  redirectPath: string;
}

const ProtectedRoute = ({ redirectPath = "/" }: ProtectedRouteProps) => {
  const [authenticated, setAuthenticated] = useState(false);
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

      const { userID, blocked }: { userID: string; blocked: boolean } = await response.json();
      if (!blocked || userID) setAuthenticated(true);
    };
    checkJWT();
  }, []);
  return authenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
