// import { useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { Link as RouterLink } from "react-router-dom";

// import Grid from "@mui/material/Grid";
// import { TextField, Typography, Button, Link, Alert } from "@mui/material";
// import { Google } from "@mui/icons-material";
// import { AuthLayout } from '../layouts/AuthLayout';
// import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../redux/auth";
// import { useForm } from "../../hooks";


// const formDate = { 
//   email: "",
//   password: "",
// }

// export const LoginPage = () => {
//   const { status,errorMessage } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();


//   const { email, password, onInputChange } = useForm(formDate);

//   const isAutheticate = useMemo(() => status === "checking", [status]);
  
//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(checkingAuthentication(email, password));
//     dispatch(startLoginWithEmailPassword(email,password))
//   };

//   const onGoogleSigIn = () => {
//     dispatch(startGoogleSignIn(email, password));
//   };

//   return (
//     <AuthLayout title="Login">
//       <form onSubmit={onSubmit}>
//         <Grid container>
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
//             <Grid item xs={12} sm={12} display={!!errorMessage ? '':'none'}>
//               <Alert severity="error">
//                 {errorMessage}
//               </Alert>
//             </Grid>

//             <Grid item xs={12} sm={12}>
//               <Button
//                 disabled={isAutheticate}
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//               >
//                 Login
//               </Button>
//             </Grid>

//             {/* <Grid item xs={12} sm={6}>
//               <Button
//                 disabled={isAutheticate}
//                 variant="contained"
//                 fullWidth
//                 onClick={onGoogleSigIn}
//               >
//                 <Google />
//                 <Typography sx={{ ml: 1 }}>Google</Typography>
//               </Button>
//             </Grid> */}

//             <Grid container direction="row" justifyContent="end">
//               <Link
//                 component={RouterLink}
//                 color="inherit"
//                 to="/auth/register"
//                 sx={{ mt: 2 }}
//               >
//                 Crear una cuenta
//               </Link>
//             </Grid>
//           </Grid>
//         </Grid>
//       </form>
//     </AuthLayout>
//   );
// };
