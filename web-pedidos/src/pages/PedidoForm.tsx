import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPedido, getPedidoById, updatePedido } from "../api/pedidos.api";
import type { Pedido } from "../types/Pedido";
export const PedidoForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState<Pedido>({
        id: 0,
        numeroPedido: "",
        cliente: "",
        fecha: "",
        total: 0,
    });
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);
    // Cargar datos si estamos editando
    useEffect(() => {
        if (id) {
            getPedidoById(Number(id))
                .then((res) => setPedido(res.data))
                .catch((err) => {
                    console.error(err);
                    setMensaje("Error al cargar el pedido");
                    setEsError(true);
                });
        }
    }, [id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPedido({ ...pedido, [name]: name === "total" ? Number(value) : value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await updatePedido(pedido.id, pedido);
            } else {
                response = await createPedido(pedido);
            }
            setMensaje(response.data.message);
            setEsError(false);

            setTimeout(() => {
                navigate("/pedidos");
            }, 2000);
        } catch (error: any) {

            if (error.response?.data?.message) {
                setMensaje(error.response.data.message);
            } else {
                setMensaje("Error al guardar el pedido");
            }
            setEsError(true);
            console.error(error);
        }
    };
    return (
        <div className="flex justify-center items-center p-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4">
                    {id ? "Editar Pedido" : "Crear Pedido"}
                </h2>
                {/* Mensaje de exito o error */}
                {mensaje && (
                    <div
                        className={`p-2 rounded mb-4 border ${esError
                                ? "bg-red-100 text-red-800 border-red-500"
                                : "bg-green-100 text-green-800 border-green-500"
                            }`}
                    >
                        {mensaje}
                    </div>
                )}
                <label className="block mb-4">
                    Número Pedido
                    <input
                        type="text"
                        name="numeroPedido"
                        value={pedido.numeroPedido}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-black rounded"
                        required
                    />
                </label>
                <label className="block mb-4">
                    Cliente
                    <input
                        type="text"
                        name="cliente"
                        value={pedido.cliente}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-black rounded"
                        required
                    />
                </label>
                <label className="block mb-4">
                    Fecha
                    <input
                        type="datetime-local"
                        name="fecha"
                        value={pedido.fecha ? pedido.fecha.substring(0, 16) : ""}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-black rounded"
                        required
                    />
                </label>
                <label className="block mb-6">
                    Total
                    <input
                        type="number"
                        name="total"
                        value={pedido.total}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-black rounded"
                        required
                        step="0.01"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-green-500 border border-black text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};