import { Route, Routes, Navigate } from "react-router-dom";
import PlanIndex from "../Builder/PlanIndex";
import {
  ArqPlataformPage,
  UsuarioPagePerfil,
} from '../pages';
import { ModuloMaestro } from "../pages/ModuloMaestro";


export const ArqPlataformRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<ArqPlataformPage />} />
      <Route path="/perfil" element={<UsuarioPagePerfil />} />
      <Route path="/proyecto/:slug" element={<ModuloMaestro />} />
      <Route path="/proyecto/:slug/:id" element={<PlanIndex />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
