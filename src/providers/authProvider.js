import { login, register } from './../services/authService';

export const LoginWithEmailPassword = (email, password) => {
	return login(email, password).then(res => res);
	//  try {

	//     const resp = await login(email,password)
			
	//     console.log(resp)

		//    return { 
		//     ok: true,
		//     uid, photoURL,email, displayName
		//    }
		
			
	//  } catch (error) {
	//      return { ok: false, errorMessage:'Usuario o Contraseña invalido' }
	//  }
}


export const registerUser = (name, email, password) => {
	return register(name, email, password).then(res => res);
}


// export const registerUserWithEmailPassword = async({email,password, displayName}) => {

//     try {


//        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
//        const {uid, photoURL} = resp.user

//        //TODO: actualizar el nombre del usuario en firebase
//        await updateProfile(FirebaseAuth.currentUser,{
//             displayName
//        })

//        return { 
//         ok: true,
//         uid, photoURL,email, displayName
//        }
      
        
//     } catch (error) {
//         return { ok: false, errorMessage:error.message }
//     }
// }


// export const logoutFirebase = async () => { 
//     return await FirebaseAuth.signOut();
// }