import React, { useState } from 'react'
import moment from 'moment';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NewProject from '../NewProject/NewProject';

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
}

export const RowList = ({ row, index, data }) => {

    const [show, setShow] = useState(false);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

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
                    <Grid item xs={1.5} sx={styleGrid}>{formatDate(row.createdAt)}</Grid>
                    <Grid item xs={1.5} sx={styleGrid}>{formatDate(row.updatedAt)}</Grid>
                    <Grid item xs={2} sx={styleGrid}>{row.client}</Grid>
                    <Grid item xs={1.5} sx={styleGrid} >

                        <NewProject onRow data={row} />
                        <GroupsIcon />
                        <DeleteIcon />
                    </Grid>
                </Grid>
            }
            {show && data.map((
                row2, index) => {
                return (
                    <div key={index}>
                        {row2.parent_id == row.id &&

                            <Grid container>

                                <Grid item xs={0.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row2.id}</Grid>
                                <Grid item xs={0.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row.type_id == 1 &&
                                    <SchoolIcon />
                                }</Grid>
                                <Grid item xs={2} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row2.name}</Grid>
                                <Grid item xs={1} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row2.ubication}</Grid>
                                <Grid item xs={1.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row2.manager}</Grid>
                                <Grid item xs={1.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>{formatDate(row.createdAt)}</Grid>
                                <Grid item xs={1.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>{formatDate(row.updatedAt)}</Grid>
                                <Grid item xs={2} sx={{ ...styleGrid, background: "#F3F6F9" }}>{row2.client}</Grid>
                                <Grid item xs={1.5} sx={{ ...styleGrid, background: "#F3F6F9" }}>
                                    <NewProject onRow data={row2} />

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