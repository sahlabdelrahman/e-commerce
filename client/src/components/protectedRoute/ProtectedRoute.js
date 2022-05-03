import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const protectedRoute = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default protectedRoute;
