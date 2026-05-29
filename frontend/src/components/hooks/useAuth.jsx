import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((store) => store.auth);
  return { user, isLoggedIn: !!user };
};

export default useAuth;
