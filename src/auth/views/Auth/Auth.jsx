import { useSelector } from "react-redux";
import { LoginView, RegisterView } from "../index";
import Alert from "@mui/material/Alert";
import { SnackbarProvider } from "notistack"
import "./Auth.css"

export const AuthView = () => {
	var authView = useSelector((state) => state.auth.authView);
	
	return (
		<>
			{/* <SnackbarProvider maxSnack={3}> */}
			{authView === "login" ? <LoginView /> : <RegisterView />}
			{/* </SnackbarProvider> */}
		</>
	)
}
