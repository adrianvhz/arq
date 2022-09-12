import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";


export const CardComponent = ({data}) => {

  const {plan,permisos} = data
  console.log(plan)
  return (
    <Card  sx={{
        width: "calc(100%/3.2)",
        backgroundColor: "#FFF",
        padding: "20px",
        borderRadius: 3,
        boxShadow: "rgb(100 100 111) 0px 7px 29px 0px",
      }}>
      <CardContent
       
      >
        <Typography variant="h5" component="div">
          {plan.descripcion}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {plan.vigencia} Días
        </Typography>

        <ul>
            {
              permisos.map(p=>(
                  <li key={p.id}>{p.descripcion}</li>
              ) )
            }
        </ul>
      </CardContent>
    </Card>
  );
};
