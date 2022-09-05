import { LoginWithEmailPassword, registerUser } from "../../providers";
import { checkingCredentials, login, logout, loginFail } from "./authSlice";


// export const checkingAuthentication = (email, password) => {
//   return async (dispatch) => {
//     dispatch(checkingCredentials());
//   };
// };

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
	email,
	password,
	handleBackdrop
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		var res = await registerUser(name, email, password);
		if (res.status === 201) {
			console.log(res)
			handleBackdrop({ message: "Registro exitoso!", variant: "success" });
			dispatch(login({}));
		} else {
			handleBackdrop({ message: "Error: " + res.response.data.error, variant: "error" });
			dispatch(loginFail());
		}

		// const { ok, uid, photoURL, errorMessage } =
		// await registerUserWithEmailPassword({ email, password, displayName });
	
		// if (!ok) return dispatch(logout({ errorMessage }));
	
		// dispatch(login({ uid, photoURL, displayName, email }));
  }
}

export const startLoginWithEmailPassword = (
	email, password, handleBackdrop
) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		var res = await LoginWithEmailPassword(email, password);

		if (res.status === 200) {
			handleBackdrop({ message: res.data.message, variant: "success" });
			var { data: { data } } = res;
			dispatch(login({ name: data.name, email: data.email }));
		} 
		else if (res.response.status > 0) {
			handleBackdrop({ message: "Error: " + res.response.data.error, variant: "error" });
			dispatch(loginFail());
		}
		else {
			handleBackdrop({ message: "Internal server error, please report it.", variant: "error" })
			dispatch(loginFail());
		}

		// const { ok, uid, photoURL, displayName, errorMessage } =
		//   await LoginWithEmailPassword(email, password);
		// if (!ok) return dispatch(logout({ errorMessage }));
		
		// dispatch(login({ uid, photoURL, displayName, email }));
	}
}

export const startLogoutAuth = () => {
  return async (dispatch) => {
    // await logoutFirebase();
     dispatch(logout());
  };
};
