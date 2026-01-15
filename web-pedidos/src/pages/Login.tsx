import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje("");
        try {
            await login(email, password);
            navigate("/pedidos");
        } catch (error: any) {
            setMensaje(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            {mensaje && (
                <div className="bg-red-100 text-red-800 border border-red-500 p-2 rounded">
                    {mensaje}
                </div>
            )}
            <input
                className="input"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button className="btn w-full">Login</button>
        </form>
    );
}