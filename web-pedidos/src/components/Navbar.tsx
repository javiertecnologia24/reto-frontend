import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
            <Link to="/pedidos">Pedidos</Link>
            <Link to="/pedidos/nuevo">Nuevo Pedido</Link>
            <button onClick={logout} className="ml-auto">Salir</button>
        </nav>
    );
}