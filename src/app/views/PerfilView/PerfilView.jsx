import { BasicTabs } from './../../components/BasicTabs';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PlanComponent } from '../../components/PlanComponent/PlanComponent';
import { useDispatch, useSelector } from 'react-redux';
import { EmailComponent,DatosComponent,PasswordComponent  } from '../../components/DatosComponent';

export const PerfilView = () => {

    const { planes  }  = useSelector(status => status.plan)
    const user = useSelector(status => status.auth)
    const   data  = planes
    const titulo =['Persona','Correo','Contrasena','Plan de pago']
    return (
        <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "#eef0f8;", padding:'20px' }}
    >
            <Grid item xs={12}>
                <BasicTabs titulo={titulo} >
                    <DatosComponent user={user} key={0}   />
                    <EmailComponent user={user} key={1}   />
                    <PasswordComponent user={user} key={2}   />
                    <PlanComponent  key={3} planes={data} />
                </BasicTabs>

            </Grid>
        </Grid>
           
    );
}

