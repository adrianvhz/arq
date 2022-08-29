import React, { useMemo, useState } from 'react'
import moment from 'moment';
import './styles.css';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Button, Grid, Modal } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from "react-router-dom";
import NewProjectForm from '../NewProject/NewProjectForm';
import NewProject from '../NewProject/NewProject';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
}

const containerCustom = {
    marginLeft: "2rem",
    marginRight: "2rem",
}
const GridData = (data) => {

    const [rowData] = useState(
        data.data.proyectos
    );

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    const rowList = () => {
        return rowData.map((row, index) => {

            const [show, setShow] = useState(false);

            return (
                <div key={index}>
                    {row.parent_id === 0 &&
                        <Grid container>

                            <Grid item xs={0.5} sx={styleGrid}>{row.id}</Grid>
                            <Grid item xs={0.5} sx={styleGrid}>{row.type_id == 1 &&
                                <SchoolIcon />
                            }</Grid>
                            <Grid item xs={2} sx={styleGrid} >
                                <div style={{
                                    display: "flex", justifyContent: "space-between",
                                }}>
                                    <span>{row.name}</span>
                                    {!show ? <KeyboardArrowDownIcon onClick={() => setShow(!show)} sx={{ cursor: "pointer" }} /> :
                                        <KeyboardArrowLeftIcon onClick={() => setShow(!show)} sx={{ cursor: "pointer" }} />}

                                </div>


                            </Grid>
                            <Grid item xs={1} sx={styleGrid}>{row.ubication}</Grid>
                            <Grid item xs={1.5} sx={styleGrid}>{row.manager}</Grid>
                            <Grid item xs={1.5} sx={styleGrid}>{formatDate(row.updatedAt)}</Grid>
                            <Grid item xs={1.5} sx={styleGrid}>{formatDate(row.updatedAt)}</Grid>
                            <Grid item xs={2} sx={styleGrid}>{row.client}</Grid>
                            <Grid item xs={1.5} sx={styleGrid} >

                                <NewProject onRow data={row} />
                                <GroupsIcon />
                                <DeleteIcon />
                            </Grid>
                        </Grid>
                    }
                    {show && rowData.map((
                        row2, index) => {
                        return (
                            <div key={index}>
                                {row2.parent_id == row.id &&

                                    <Grid container>

                                        <Grid item xs={0.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row2.id}</Grid>
                                        <Grid item xs={0.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row.type_id == 1 &&
                                            <SchoolIcon />
                                        }</Grid>
                                        <Grid item xs={2} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row2.name}</Grid>
                                        <Grid item xs={1} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row2.ubication}</Grid>
                                        <Grid item xs={1.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row2.manager}</Grid>
                                        <Grid item xs={1.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>{formatDate(row.createdAt)}</Grid>
                                        <Grid item xs={1.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>{formatDate(row.updatedAt)}</Grid>
                                        <Grid item xs={2} sx={{ ...styleGrid, background: "#C8C8C8" }}>{row2.client}</Grid>
                                        <Grid item xs={1.5} sx={{ ...styleGrid, background: "#C8C8C8" }}>
                                            <NewProject onRow data={row} />

                                            <GroupsIcon />

                                            <DeleteIcon />
                                        </Grid>
                                    </Grid>
                                }
                            </div>
                        )
                    }
                    )}
                </div >
            )
        }
        )
    }




    return (
        <div style={containerCustom} >
            <Grid container>
                <Grid item xs={0.5} sx={{ ...styleGrid, fontWeight: 600 }}>
                    {/* <Box width="100%" sx={styleGrid}> */}
                    ID

                    {/* </Box> */}
                </Grid>
                <Grid item xs={0.5} sx={{ ...styleGrid, fontWeight: 600 }}>

                    Tipo
                </Grid>
                <Grid item xs={2} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Nombre del proyecto
                </Grid>
                <Grid item xs={1} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Ubicacion
                </Grid>
                <Grid item xs={1.5} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Responsable
                </Grid>
                <Grid item xs={1.5} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Fecha de Elab.
                </Grid>
                <Grid item xs={1.5} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Fecha de Act.
                </Grid>
                <Grid item xs={2} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Nombe del cliente
                </Grid>
                <Grid item xs={1.5} sx={{ ...styleGrid, fontWeight: 600 }}>
                    Acciones
                </Grid>




            </Grid>
            {rowList()}



        </div>
    )
}

export default GridData