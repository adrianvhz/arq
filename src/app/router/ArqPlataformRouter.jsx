import { Route, Routes, Navigate } from "react-router-dom";
import { ArqPlataformPage } from '../pages';
import ModuloEducacion from "../pages/ModuloEducacion";
import ModuloInfraestructura from "../pages/ModuloInfraestructura";
import ModuloSalud from "../pages/ModuloSalud";
import NuevoProyecto from "../pages/NuevoProyecto";

export const ArqPlataformRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<ArqPlataformPage />} />
      <Route path="/home/educacion" element={<ModuloEducacion />} />
      <Route path="/home/educacion/nuevo-proyecto" element={<NuevoProyecto proyecto={"Educación"} />} />
      <Route path="/home/salud" element={<ModuloSalud />} />
      <Route path="/home/salud/nuevo-proyecto" element={<NuevoProyecto proyecto={"Salud"} />} />
      <Route path="/home/infraestructura*" element={<ModuloInfraestructura />} />
      <Route path="/home/infraestructura/nuevo-proyecto" element={<NuevoProyecto proyecto={"Infraestructura"} />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
