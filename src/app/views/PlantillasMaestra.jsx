import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { arqPlataformAxios } from '../../utils/arqPlataformAxios';

const PlantillasMaestra = () => {
    const [plantillas, setPlantillas] = useState([]);

    const getTypeProject = async () => {
        const data = await arqPlataformAxios.get(`typeProject`);
        const dataMapeada = data.data.map((typeProject) => {
            return {
                id: typeProject.id,
                name: typeProject.name,
                icon: typeProject.icon,
                slug: typeProject.slug,
                show: typeProject.show,
            }
        });
        setPlantillas(dataMapeada)
    }

    useEffect(() => {
        getTypeProject();
    }, []);

    if (!plantillas) return null;

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
                        to={`/${plantilla.slug}`}
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
                            <span>{plantilla.name.toUpperCase()}</span>
                        </Paper>
                    </Link>
                ))}
            </Box>
        </div>
    )
}


export default PlantillasMaestra