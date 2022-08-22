import { Box, Button, Card, Container } from '@mui/material'
import React, { useState } from 'react'
import GridData from '../components/GridData/GridData'
import ModulePage from '../components/ModulePage/ModulePage'
import NewProject from '../components/NewProject/NewProject'
import { ArqPlataformLayout } from '../layout'


const ModuloInfraestructura = () => {

    return (
        <ArqPlataformLayout>
            <ModulePage pagina="infraestructura"></ModulePage>
        </ArqPlataformLayout>
    )
}



export default ModuloInfraestructura