import { Box, Button, Card, Container } from '@mui/material'
import React, { useState } from 'react'
import GridData from '../components/GridData/GridData'
import NewProject from '../components/NewProject/NewProject'
import { ArqPlataformLayout } from '../layout'


const ModuloInfraestructura = () => {


    return (
        <ArqPlataformLayout>
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
                        {/* <Button variant="contained">+ Nuevo</Button> */}
                        <NewProject></NewProject>

                    </Box>

                    <h4>
                        MIS DISEÑOS
                    </h4>
                    <span>
                        Revisa los ultimos diseños realizados
                    </span>
                    <GridData></GridData>


                </Container>


            </Card>
        </ArqPlataformLayout>
    )
}



export default ModuloInfraestructura