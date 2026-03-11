import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  logoutUser,
  clearError,
  initializeAuth,
} from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading, error, initialized } = useSelector(
    (state) => state.auth,
  );

  const login = (credentials) => {
    return dispatch(loginUser(credentials));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const initialize = () => {
    return dispatch(initializeAuth());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    login,
    logout,
    clearAuthError,
    initialize,
  };
};

export default useAuth;
