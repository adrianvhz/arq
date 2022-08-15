import { Route,Routes,Navigate } from "react-router-dom";
import {ArqPlataformPage} from '../pages';

export const ArqPlataformRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<ArqPlataformPage />}/>
        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>   
  )
}
