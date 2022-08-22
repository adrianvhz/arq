import { Box, Button, Card, Container, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import GridData from '../GridData/GridData'
import NewProject from '../NewProject/NewProject'
import { Link as RouterLink } from "react-router-dom";
import { plataformAxios } from '../../../services/zonesService';


const ModulePage = ({ pagina }) => {

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    const getZones = async () => {
        const data = await plataformAxios.get(`projects`);
        setProject(data.data);
        if (data) {
            setLoading(false);
        }
    }



    useEffect(() => {
        getZones();
    }, []);

    if (loading) { return <div>Cargando...</div> }

    return (
        <Card sx={{
            width: '100%',
            height: '100%',
        }}>
            <Container>

                <h4>
                    CREAR UN DISEÑO
                </h4>
                <Box sx={
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }
                } >
                    <span>
                        Puedes crear desde 0 o escoger una plantilla del proyecto
                    </span>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to={`/home/${pagina}/nuevo-proyecto`}
                        sx={{ mt: 2, textDecoration: "none" }}>
                        <Button variant="contained" >+ Nuevo</Button>
                    </Link>
                </Box>

                <h4>
                    MIS DISEÑOS
                </h4>
                <span>
                    Revisa los ultimos diseños realizados
                </span>
                <GridData data={project}></GridData>


            </Container>


        </Card>
    )
}

export default ModulePage