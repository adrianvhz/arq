import { Navigate, Route, Routes, } from "react-router-dom";
import { ArqPlataformRouter } from './../app/router';
import { AuthLayout } from "../auth/layouts/AuthLayout";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack"
// import { AuthRoutes } from './../auth/routes';
// import { useCheckAuth } from './../hooks';

export const  AppRouter = ()=> {
	//const isAutheticate = useSelector((state) => state.auth.status) === "authenticated"
	const isAutheticate = true
//  const {status} = useCheckAuth()

  //if( status=== 'checking' ) return <CheckingAuth />
	console.log(isAutheticate)
	return (
		<SnackbarProvider maxSnack={3}>

		<Routes>
			{/*Login y Register */}
			{
				(isAutheticate)
				? <Route path="/*" element={<ArqPlataformRouter />} />
				:  <Route path="/auth/*" element={<AuthLayout />} />

        	}
        	<Route path="/*" element={<Navigate to='/auth/' />} />

			{/* <Route path="/" element={isAutheticate ? <Navigate to="/home" /> : <AuthLayout />} />
			

			<Route path="/*" element={isAutheticate ? <ArqPlataformRouter /> : <AuthLayout />} /> */}


			
		</Routes>
		</SnackbarProvider>
	)
}
