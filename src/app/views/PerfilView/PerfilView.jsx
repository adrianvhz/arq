
import React from 'react';
import { BasicTabs } from './../../components/BasicTabs';
import { Grid } from '@mui/material';
import { StarOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DatosComponent } from './../../components/DatosComponent/DatosComponent';
import { PlanComponent } from '../../components/PlanComponent/PlanComponent';
export const PerfilView = () => {
    const titulo =['Persona','Plan de pago']
    return (
        <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "#eef0f8;", padding:'20px' }}
    >
            <Grid item xs={12}>
                <BasicTabs titulo={titulo} >
                    <DatosComponent key={0}   />
                    <PlanComponent  key={1} />
                </BasicTabs>

            </Grid>
        </Grid>
           
    );
}

