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
                    width: '100%',
                    height: '500px',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignContent: 'center',
                    textDecoration: 'none',
                    '& > :not(style)': {
                        m: 1,
                        textDecoration: 'none',
                    },

                }}
            >
                {plantillas.map((plantilla, idx) => (
                    <Link
                        component={RouterLink}
                        key={idx}
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
                            borderRadius: '20px',
                            textAlign: 'center',
                        }} elevation={5}>
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