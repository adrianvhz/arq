import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from '../../../hooks';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login, updatePerfil } from "../../../redux/auth";
import { startSavePerfil } from "../../../redux/planes/thunks";
import Swal from "sweetalert2";

export const PasswordComponent = ({user}) => {
  const { successMessage } = user
   const isValidate = false;
  const {  password,onInputChange,formState } = useForm(user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login(formState))
  }, [formState]);

  useEffect(() => {
    if (successMessage.length > 0) {
      Swal.fire("Contraseña actualizada", user.successMessage, "success");
    }
  }, [successMessage]);

  const onSavePerfil = () => {
    dispatch(startSavePerfil(3,password));
  };


  return (
    <Grid
      container
      spacing={0}
      justifyContent="left"
      sx={{
        minHeight: "auto",
        backgroundColor: "#eef0f8;",
        padding: "20px",
      }}
    >
      
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">  
          <TextField
            error={isValidate}
            id="outlined-error"
            label="Contrasena"
            type="password"
            fullWidth
            placeholder="Ingrese un contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </FormControl>
        
        <FormControl sx={{ m: 1 }} variant="standard">
          <Button 
          variant="contained"
          onClick={onSavePerfil}
          
          >Guardar</Button>
        </FormControl>
    </Grid>
  );
};
