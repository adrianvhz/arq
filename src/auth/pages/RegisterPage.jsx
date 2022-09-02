// import { Link as RouterLink } from "react-router-dom";
// import { useForm } from "../../hooks";
// //import { startCreateUserWitbEmailPassword } from "../../store/auth";
// import Grid from "@mui/material/Grid";
// import { TextField, Typography, Button, Link, Alert } from "@mui/material";
// import { useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AuthLayout } from '../layouts/AuthLayout';

// const formData = {
//   displayName: "",
//   email: "",
//   password: "",
// };

// const formValidations = {
//   email: [(value) => value.includes("@"), "El correo no es correcto"],
//   password: [
//     (value) => value.length >= 6,
//     "El password debe de tener mas de 6 caracteres",
//   ],
//   displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
// };

// export const RegisterPage = () => {
//   const dispatch = useDispatch();

//   const [formSubmitted, setFormSubmitted] = useState(false);

//   //const { status, errorMessage } = useSelector(state=>state.auth)

// //  const isChekingAuthentication = useMemo( ()=> status === 'checking', [status])

//   const {
//     name,
//     email,
//     password,
//     onInputChange,
//     formState,
//     isFormValid,
//     displayNameValid,
//     emailValid,
//     passwordValid,
//   } = useForm(formData, formValidations);

  
//   const onSubmit = (e) => {
//     e.preventDefault();

//     setFormSubmitted(true);

//     if (!isFormValid) return;

//     //dispatch(startCreateUserWitbEmailPassword(formState));
//   };

//   return (
//     <AuthLayout title="Register">
//       {/* <h1>FormValid : {isFormValid ? "Valido" : "Incorrecto"} </h1> */}
//       <form onSubmit={onSubmit}>
//         <Grid container>
//           <Grid item xs={12} sx={{ mt: 2 }}>
//             <TextField
//               label="Nombre completo"
//               type="text"
//               placeholder="Tu Nombre Completo"
//               fullWidth
//               name="displayName"
//               value={name}
//               onChange={onInputChange}
              
//             />
//           </Grid>
          
//           <Grid item xs={12} sx={{ mt: 2 }}>
//             <TextField
//               label="Correo"
//               type="email"
//               placeholder="correo@google.com"
//               fullWidth
//               name="email"
//               value={email}
//               onChange={onInputChange}
             
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ mt: 2 }}>
//             <TextField
//               label="Contraseña"
//               type="password"
//               placeholder="contraseña"
//               fullWidth
//               name="password"
//               value={password}
//               onChange={onInputChange}
              
//             />
//           </Grid>

//           <Grid container spacing={2} sx={{ mg: 2, mt: 1 }}>

//           <Grid 
//           item xs={12}
         
//           >
//               {/* <Alert
//                 severity="error"

//               >{errorMessage}</Alert> */}
//             </Grid>

//             <Grid item xs={12}>
//               <Button 
//               type="submit" 
//               variant="contained" 
//               fullWidth>
//                 Crear cuenta
//               </Button>
//             </Grid>

//             <Grid container direction="row" justifyContent="end">
//               <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
//               <Link component={RouterLink} color="inherit" to="/auth/login">
//                 ingresar
//               </Link>
//             </Grid>
//           </Grid>
//         </Grid>
//       </form>
//     </AuthLayout>
//   );
// };
