import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { PedidosList } from "./pages/PedidosList";
import { PedidoForm } from "./pages/PedidoForm";
import Navbar from "./components/Navbar";
import { ProtectedRoute } from "./auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pedidos" element={<ProtectedRoute><PedidosList /></ProtectedRoute>} />
        <Route path="/pedidos/nuevo" element={<ProtectedRoute><PedidoForm /></ProtectedRoute>} />
        <Route path="/pedidos/:id" element={<ProtectedRoute><PedidoForm /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}