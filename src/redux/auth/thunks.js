import { LoginWithEmailPassword } from "../../providers";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    //const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreateUserWitbEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    // dispatch(checkingCredentials());

    // const { ok, uid, photoURL, errorMessage } =
    //  // await registerUserWithEmailPassword({ email, password, displayName });

    // if (!ok) return dispatch(logout({ errorMessage }));

    // dispatch(login({ uid, photoURL, displayName, email }));
  };
};

export const startLoginWithEmailPassword =  (email, password) => {

  return async (dispatch) => {

    dispatch(checkingCredentials());
     const resp =  await LoginWithEmailPassword(email, password);
     console.log(resp)
    // const { ok, uid, photoURL, displayName, errorMessage } =
    //   await LoginWithEmailPassword(email, password);
    // if (!ok) return dispatch(logout({ errorMessage }));

    // dispatch(login({ uid, photoURL, displayName, email }));
  };
};

export const startLogoutAuth = () => {
  return async (dispatch) => {
    // await logoutFirebase();
     dispatch(logout());
  };
};
