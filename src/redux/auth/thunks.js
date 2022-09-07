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
	lastname,
	email,
	password,
	handleBackdrop
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		var res = await registerUser(name, lastname, email, password);
		console.log(res);
		if (res.status === 201) {
			handleBackdrop({ message: "Registro exitoso!", variant: "success" });
			dispatch(login({}));
		} else {
			res.response.data.errors?.forEach(el => {
				handleBackdrop({ message: "Error: " + el.msg, variant: "error" });
			})
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

		console.log(res)
		if (res.status === 200) {
			var { data: { data: { data, msg, token } } } = res;
			
			// delete this later
			var d = new Date();
			d.setTime(d.getTime() + (60 * 60 * 60 * 1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = "token=" + token + "; " + expires + "; path=/";
			// delete this later

			handleBackdrop({ message: msg, variant: "success" });
			dispatch(login({ name: data.name, email: data.email }));
		} 
		else if (res.response.status > 0) {
			console.log(res)
			handleBackdrop({ message: "Error: " + res.response.data.data.msg, variant: "error" });
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
