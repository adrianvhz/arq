import { CardComponent } from "../CardComponent";
import { Grid } from '@mui/material';


export const PlanComponent = () => {
  return (
    <Grid 
    container
     direction='row' 
     justifyContent='space-between' 
     sx={{mb:1}}>
        <CardComponent key={1}/>
        <CardComponent key={2} />
        <CardComponent key={3}/>
    </Grid>
  );
};
