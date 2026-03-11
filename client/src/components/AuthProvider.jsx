import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

function AuthProvider({ children }) {
  const { initialize, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  return children;
}

export default AuthProvider;
