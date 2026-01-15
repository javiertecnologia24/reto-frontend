import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth.api";
interface AuthContextType {
    isAuth: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(
        !!localStorage.getItem("token")
    );
    const login = async (email: string, password: string) => {
        try {
            const res = await loginRequest(email, password);
            if (!res.data.success) {
                throw new Error(res.data.message);
            }
            localStorage.setItem("token", res.data.token);
            setIsAuth(true);
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || error.message || "Error al iniciar sesión"
            );
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };
    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);