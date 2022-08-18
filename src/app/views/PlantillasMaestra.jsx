import { Box, Link, Paper } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";

const PlantillasMaestra = () => {

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    textDecoration: 'none',
                    '& > :not(style)': {
                        m: 1,
                        textDecoration: 'none',
                    },

                }}
            >
                {plantillas.map(plantilla => (
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to={plantilla.to}
                        sx={{ mt: 2 }}>
                        <Paper sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '2rem',
                            width: 350,
                            height: 200,
                            // fontWeight: 'bold',
                            textAlign: 'center',
                        }} onClick={() => console.log("hola")} elevation={5}>
                            <span>{plantilla.nombre.toUpperCase()}</span>
                        </Paper>
                    </Link>
                ))}
            </Box>
        </div>
    )
}


export default PlantillasMaestra

const plantillas = [{
    nombre: 'Educacion',
    route: '/educacion',
    to: '/home/educacion',

},
{
    nombre: 'Salud',
    route: '/salud',
    to: '/home/salud',
},
{
    nombre: "Infraestructura Urbana",
    route: '/infraestructura-urbana',
    to: '/home/infraestructura',
}]