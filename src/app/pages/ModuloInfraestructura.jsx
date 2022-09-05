import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import React, { useState } from 'react'
import GridData from '../components/GridData/GridData'
import ModulePage from '../components/ModulePage/ModulePage'
import NewProject from '../components/NewProject/NewProject'
import { ArqPlataformLayout } from '../layout'


export const ModuloInfraestructura = () => {

    return (
        <ArqPlataformLayout>
            <ModulePage pagina="infraestructura"></ModulePage>
        </ArqPlataformLayout>
    )
}



