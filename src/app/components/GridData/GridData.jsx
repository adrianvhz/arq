import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './styles.css';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from '@mui/material';

const rowStyle = { background: 'black' };

// set background colour on even rows again, this looks bad, should be using CSS classes
// const getRowStyle = params => {
//     if (params.node.rowIndex % 2 === 0) {
//         return { background: 'red' };
//     }
// };


const GridData = (data) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);


    //formatear fecha con momentjs y formatearlo a dd/mm/yyyy
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY') === 'Invalid date' ? date : moment(date).format('DD/MM/YYYY');
    }

    const [rowData] = useState(
        data.data.proyectos
    );



    const [columnDefs] = useState([
        // tipo, nombre del proyecto, ubicacion, responsable, fecha de elaboracion, fecha de actualizacion, nombre del cliente, estado, Acciones
        { headerName: "ID", field: "id", width: 60, sortable: true },
        // renderize image
        {
            headerName: "Tipo", field: "type_id", width: 60, cellRenderer: (params) => {
                return (
                    // <img src={params.value.image} alt={params.value.name} width="50" height="50" />
                    <SchoolIcon />
                )
            }
        },
        { headerName: "Nombre del proyecto", field: "name", filter: true, width: 160 },
        { headerName: "Ubicacion", field: "ubication", filter: true, width: 100 },
        { headerName: "Responsable", field: "manager", filter: true, width: 150 },
        { headerName: "Fecha de elaboracion", field: "createdAt", filter: true, width: 160, valueFormatter: formatDate },
        { headerName: "Fecha de actualizacion", field: "updatedAt", filter: true, width: 170, valueFormatter: formatDate },
        { headerName: "Nombre del cliente", field: "client", filter: true, width: 150 },
        {
            headerName: "Acciones", field: "acciones", width: 120, cellRenderer: (params) => {
                return (
                    <div >
                        {/* <Button size='small'><AddIcon /></Button> */}
                        <AddIcon style={{ cursor: "pointer", marginRight: ".5rem" }}></AddIcon>
                        <DeleteIcon style={{ cursor: "pointer", marginRight: ".5rem" }}>
                            {/* <Button size='small'><DeleteIcon /></Button> */}
                        </DeleteIcon>
                        <GroupsIcon style={{ cursor: "pointer", marginRight: ".5rem" }}></GroupsIcon>

                        {/* <Button size='small'><DeleteIcon /></Button>
                        <Button size='small'><GroupsIcon /></Button> */}
                    </div>
                )
            }
        },
    ])
    return (
        <div style={containerStyle}>
            <div style={{ height: 400, width: "100%" }} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    )
}

export default GridData