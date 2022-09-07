import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";


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
