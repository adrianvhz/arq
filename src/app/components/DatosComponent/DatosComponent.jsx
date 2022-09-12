import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  Alert,
  AlertTitle
} from "@mui/material";
import { useForm } from '../../../hooks';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import {  login, updatePerfil } from "../../../redux/auth";
import { startSavePerfil } from "../../../redux/planes/thunks";
import Swal from "sweetalert2";

export const DatosComponent = ({user}) => {
  const { successMessage } = user
   const isValidate = false;
  const {  name,lastname,onInputChange,formState } = useForm(user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login(formState))
  }, [formState]);

  useEffect(() => {
    if (successMessage.length > 0) {
      Swal.fire("Usuario actualizado", user.successMessage, "success");
    }
  }, [successMessage]);

  const onSavePerfil = () => {
    dispatch(startSavePerfil());
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
            label="Nombres"
            type="text"
            fullWidth
            placeholder="Ingrese un nombre"
            name="name"
            value={name}
            onChange={onInputChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <TextField
            error={isValidate}
            id="outlined-error"
            label="Apellidos"
            name="lastname"
            value={lastname}
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
