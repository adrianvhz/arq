import { Route, Routes, Navigate } from "react-router-dom";
import { ArqPlataformPage,
  UsuarioPagePerfil,
  ModuloEducacion,
  ModuloInfraestructura,
  ModuloSalud } from '../pages';
// import ModuloEducacion from "../pages/ModuloEducacion";
// import ModuloInfraestructura from "../pages/ModuloInfraestructura";
// import ModuloSalud from "../pages/ModuloSalud";

export const ArqPlataformRouter = () => {
	
  return (
    <Routes>
      <Route path="/" element={<ArqPlataformPage />} />
      <Route path="/educacion" element={<ModuloEducacion />} />
      <Route path="/salud" element={<ModuloSalud />} />
      <Route path="/infraestructura*" element={<ModuloInfraestructura />} />
      <Route path="/perfil" element={<UsuarioPagePerfil />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
