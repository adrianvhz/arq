import { useSelector } from "react-redux";
import { LoginView, RegisterView } from "../index";
import Alert from "@mui/material/Alert";
import { SnackbarProvider } from "notistack"
import "./Auth.css"

export const AuthView = () => {
	var authView = useSelector((state) => state.auth.authView);
	
	return (
		<>
			{authView === "login" ? <LoginView /> : <RegisterView />}
		</>
	)
}
