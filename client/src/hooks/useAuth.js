import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state);

  if (user && user.token) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
