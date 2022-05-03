import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const publicRoute = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default publicRoute;
