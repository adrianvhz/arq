import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
} from "@mui/material";

export const CardComponent = () => {
  return (
    <Card  sx={{
        width: "calc(100%/3.2)",
        backgroundColor: "#FFF",
        padding: "20px",
        borderRadius: 3,
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}>
      <CardContent
       
      >
        <Typography variant="h5" component="div">
          SOLIOCITA UNA PRUEBA DEMO
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          15 Días
        </Typography>

        <ul>
          <li>ACCESO ILIMITADO A TODOS LOS COMANDOS DE TRABAJO</li>
          <li>VÁLIDO PARA UN SOLO USUARIO</li>
        </ul>
      </CardContent>
    </Card>
  );
};
