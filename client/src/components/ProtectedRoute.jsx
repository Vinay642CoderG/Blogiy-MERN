import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, initialized } = useAuth();

  if (loading || !initialized) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
