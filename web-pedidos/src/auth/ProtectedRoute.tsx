import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuth } = useAuth();
    return isAuth ? <>{children}</> : <Navigate to="/login" />;
};