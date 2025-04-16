import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, persistor } from "../store";
import { logout } from "../features/auth/authSlice";
import { loginThunk } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const login = (username: string, password: string) => {
    dispatch(loginThunk({ username, password }))
      .unwrap()
      .then(() => navigate('/chat'))
      .catch(() => { });
  };

  const logoutUser = () => {
    dispatch(logout());
    persistor.purge();
  };

  return { user, login, logoutUser };
};
