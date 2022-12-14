import { LoginWithEmailPassword, registerUser } from "../../providers";
import { checkingCredentials, login, logout, loginFail } from "./authSlice";

export const checkingAuthentication = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	}
}

// export const startGoogleSignIn = () => {
//   return async (dispatch) => {
//     dispatch(checkingCredentials());

//     //const result = await singInWithGoogle();

//     if (!result.ok) return dispatch(logout(result.errorMessage));

//     dispatch(login(result));
//   };
// };

export const startCreateUserWithEmailPassword = ({
	name,
	lastname,
	email,
	password,
	handleBackdrop
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const res = await registerUser(name, lastname, email, password);

		if (res.status === 201) {
				handleBackdrop({ message: res.data.message, variant: "success" });
				dispatch(startLoginWithEmailPassword(email, password, handleBackdrop));
		} else {
			console.log(res)
			handleBackdrop({ message: res.response.data.error.message, variant: "error" });
			res.response.data.error.info?.forEach(el => {
				handleBackdrop({ message: "Error: " + el.msg, variant: "error" });
			});
			dispatch(loginFail());
		}

		// const { ok, uid, photoURL, errorMessage } =
		// await registerUserWithEmailPassword({ email, password, displayName });

		// if (!ok) return dispatch(logout({ errorMessage }));

		// dispatch(login({ uid, photoURL, displayName, email }));
	}
}

export const startLoginWithEmailPassword = (
	email,
	password,
	handleBackdrop
) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const res = await LoginWithEmailPassword(email, password);
	
		if (res.status === 200) {
			console.log(res);
			const { data, message } = res.data;
			const { token, usuario } = data;
			const { id, email, name, lastname } = usuario;
			localStorage.setItem('token', token);
			localStorage.setItem('token-init', new Date().getTime());
			handleBackdrop({ message: message, variant: "success" });
			dispatch(login({ uid: id, name, lastname, email }));
		} else if (res.response.status > 0) {
			handleBackdrop({
				message: "Error: " + res.response.data.error.message,
				variant: "error"
			});
			dispatch(loginFail());
		} else {
			handleBackdrop({
				message: "Internal server error, please report it.",
				variant: "error"
			});
			dispatch(loginFail());
		}
	}
}

export const startLogoutAuth = () => {
	return async (dispatch) => {
		// await logoutFirebase();
		dispatch(logout());
	}
}
