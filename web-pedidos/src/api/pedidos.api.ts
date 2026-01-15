import api from "./axios";
import type { Pedido } from "../types/Pedido";

export const getPedidos = () => api.get<Pedido[]>("/Pedidos");

export const getPedidoById = (id: number) =>
    api.get<Pedido>(`/Pedidos/${id}`);

export const createPedido = (data: Omit<Pedido, "id">) =>
    api.post("/Pedidos", data);

export const updatePedido = (id: number, data: Pedido) =>
    api.put(`/Pedidos/${id}`, data);

export const deletePedido = (id: number) =>
    api.delete(`/Pedidos/${id}`);