import { useEffect, useState } from "react";
import type { Pedido } from "../types/Pedido";
import { getPedidos, deletePedido } from "../api/pedidos.api";
import { useNavigate } from "react-router-dom";
export const PedidosList = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const navigate = useNavigate();
    const fetchPedidos = async () => {
        try {
            const response = await getPedidos();
            setPedidos(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (id: number) => {
        if (!confirm("¿Seguro que quieres eliminar este pedido?")) return;
        try {
            await deletePedido(id);
            fetchPedidos();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEdit = (id: number) => {
        navigate(`/pedidos/${id}`);
    };
    useEffect(() => {
        fetchPedidos();
    }, []);
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Listado de Pedidos</h1>
            <table className="min-w-full border border-gray-300 shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th>ID</th>
                        <th>Número Pedido</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.numeroPedido}</td>
                            <td>{pedido.cliente}</td>
                            <td>{new Date(pedido.fecha).toLocaleString()}</td>
                            <td>${pedido.total.toFixed(2)}</td>
                            <td className="flex gap-2">
                                <button
                                    className="border border-black px-3 py-1 bg-green-500 text-white rounded"
                                    onClick={() => handleEdit(pedido.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="border border-black px-3 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(pedido.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};