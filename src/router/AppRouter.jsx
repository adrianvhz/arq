import { Navigate,Route,Routes, } from "react-router-dom";
import { ArqPlataformRouter } from './../app/router';
import { AuthRoutes } from './../auth/routes';
import { useCheckAuth } from './../hooks';

export const  AppRouter = ()=> {

 const {status} = useCheckAuth()

  //if( status=== 'checking' ) return <CheckingAuth />

  return (
    <Routes>
        {/*Login y Register */}
        
        <Route path="/*" element={<ArqPlataformRouter />} />
       

        <Route path="/auth/*" element={<AuthRoutes />} />

        {/*Journal App */}
        {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  )
}
