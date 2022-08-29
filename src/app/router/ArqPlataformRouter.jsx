import { Route, Routes, Navigate } from "react-router-dom";
import { ArqPlataformPage } from '../pages';
import ModuloEducacion from "../pages/ModuloEducacion";
import ModuloInfraestructura from "../pages/ModuloInfraestructura";
import ModuloSalud from "../pages/ModuloSalud";

export const ArqPlataformRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<ArqPlataformPage />} />
      <Route path="/home/educacion" element={<ModuloEducacion />} />
      <Route path="/home/salud" element={<ModuloSalud />} />
      <Route path="/home/infraestructura*" element={<ModuloInfraestructura />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
