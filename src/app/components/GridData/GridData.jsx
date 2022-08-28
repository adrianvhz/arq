import React, { useMemo, useState } from 'react'
import moment from 'moment';
import './styles.css';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Grid } from '@mui/material';

const GridData = (data) => {

    //crear tablas y columnas



    const [rowData] = useState(
        data.data.proyectos
    );


    //agrupar los datos que tengan el mismo parent_id
    // const groupBy = (xs, key) => {
    //     return xs.reduce((rv, x) => {
    //         (rv[x[key]] = rv[x[key]] || []).push(x);
    //         return rv;
    //     }, {});
    // }
    // const groupedData = groupBy(rowData, 'parent_id');
    // console.log(groupedData)

    // //introducir objetos en un objeto padre
    // const groupedData2 = Object.keys(groupedData).map(key => {
    //     return {
    //         parent_id: key,
    //         children: groupedData[key]
    //     }
    // }
    // )
    // console.log(groupedData2)

    // crear nuevo array con los datos agrupados
    const groupedData = useMemo(() => {
        return rowData.reduce((acc, curr) => {
            if (acc[curr.parent_id]) {
                acc[curr.parent_id].push(curr);
            } else {
                acc[curr.parent_id] = [curr];
            }
            return acc;
        }, {});
    }, [rowData]);

    //conectar hijos con padre
    const groupedData2 = useMemo(() => {
        return Object.keys(groupedData).map(key => {
            return {
                parent_id: key,
                children: groupedData[key]
            }
        }
        )
    }
        , [groupedData]);

    console.log(groupedData2)

    //crear componente para cada grupo de datos
    //renderizar los dato

    const rowList = () => {
        return rowData.map((row, index) => {
            return (
                <div key={index}>
                    {row.parent_id === 0 &&
                        <tr>

                            <td>{row.id}</td>
                            <td>{row.type_id}</td>
                            <td>{row.name}</td>
                            <td>{row.ubication}</td>
                            <td>{row.manager}</td>
                            <td>{row.createdAt}</td>
                            <td>{row.updatedAt}</td>
                            <td>{row.client}</td>
                        </tr>
                    }
                    {rowData.map((
                        row2, index) => {
                        return (
                            <div>
                                {row2.parent_id == row.id &&

                                    <tr>

                                        <td>{row2.id}</td>
                                        <td>{row2.type_id}</td>
                                        <td>{row2.name}</td>
                                        <td>{row2.ubication}</td>
                                        <td>{row2.manager}</td>
                                        <td>{row2.createdAt}</td>
                                        <td>{row2.updatedAt}</td>
                                        <td>{row2.client}</td>
                                        <td>{row2.parent_id}</td>
                                    </tr>
                                }
                            </div>
                        )
                    }
                    )}
                </div>
            )
        }
        )
    }




    return (
        <div >
            {/* <Grid container>
                <Grid item xs={1} sx={{ border: "2px black " }}>
                    ID
                </Grid>
                <Grid item xs={1}>
                    Tipo
                </Grid>
                <Grid item xs={2}>
                   Nombre del proyecto
                </Grid>
                <Grid item xs={1}>
                    Tipo
                </Grid>
                <Grid item xs={1}>
                    ID
                </Grid>
                <Grid item xs={1}>
                    Tipo
                </Grid>
                <Grid item xs={1}>
                    ID
                </Grid>
                <Grid item xs={2}>
                    Tipo
                </Grid>
                <Grid item xs={2}>
                    ID
                </Grid>




            </Grid> */}
            <tr >

                <th>ID</th>
                <th>Tipo</th>
                <th>Nombre del proyecto</th>
                <th>Ubicacion</th>
                <th>Responsable</th>
                <th>Fecha de elaboracion</th>
                <th>Fecha de actualizacion</th>
                <th>Nombre del cliente</th>
                <th>Acciones</th>



            </tr>
            {rowList()}

            {/* <td>Soleado</td>

                <td>Mayormente soleado</td>

                <td>Parcialmente nublado</td>

                <td>Soleado</td>

                <td>Mayormente soleado</td>

                <td>Parcialmente nublado</td>

                <td>Soleado</td>

                <td>Mayormente soleado</td>

                <td>Parcialmente nublado</td> */}



        </div>
    )
}

export default GridData