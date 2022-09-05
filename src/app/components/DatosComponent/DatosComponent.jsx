import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
  Button
} from "@mui/material";
import React, { useState } from "react";

export const DatosComponent = () => {
  const isValidate = false;
  const [name, setName] = useState("Composed TextField");
  const handleChange = (event) => {
    setName(event.target.value);
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
      <form>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <TextField
            error={isValidate}
            id="outlined-error"
            label="Nombres"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <TextField
            error={isValidate}
            id="outlined-error"
            label="Apellidos"
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <TextField
            error={isValidate}
            id="outlined-error"
            label="Correo"
          />
        </FormControl>
        <FormControl  sx={{ m: 1 }} variant="standard">
          <Button variant="contained">Guardar</Button>
        </FormControl>
      </form>
    </Grid>
  );
};
