import React, { useMemo, useState } from 'react'

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './styles.css';


const rowStyle = { background: 'black' };

// set background colour on even rows again, this looks bad, should be using CSS classes
const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
        return { background: 'red' };
    }
};


const GridData = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const [rowData] = useState([
        { ID: "25", tipo: "Casa", proyecto: 35000, ubicacion: "Japan", responsable: "Ford", fecha: "2011/01/01", actualizacion: "2011/01/01", cliente: "Ford", estado: "Japan", acciones: "Japan" },
        { ID: "26", tipo: "Casa", proyecto: 35000, ubicacion: "Japan", responsable: "Ford", fecha: "2011/01/01", actualizacion: "2011/01/01", cliente: "Ford", estado: "Japan", acciones: "Japan" },
        { ID: "27", tipo: "Casa", proyecto: 35000, ubicacion: "Japan", responsable: "Ford", fecha: "2011/01/01", actualizacion: "2011/01/01", cliente: "Ford", estado: "Japan", acciones: "Japan" },
        { ID: "28", tipo: "Casa", proyecto: 35000, ubicacion: "Japan", responsable: "Ford", fecha: "2011/01/01", actualizacion: "2011/01/01", cliente: "Ford", estado: "Japan", acciones: "Japan" },
    ]);


    const [columnDefs] = useState([
        // tipo, nombre del proyecto, ubicacion, responsable, fecha de elaboracion, fecha de actualizacion, nombre del cliente, estado, Acciones
        { headerName: "ID", field: "ID", width: 70 },
        { headerName: "Tipo", field: "tipo", filter: true, width: 90 },
        { headerName: "Nombre del proyecto", field: "proyecto", filter: true, width: 160 },
        { headerName: "Ubicacion", field: "ubicacion", filter: true, width: 100 },
        { headerName: "Responsable", field: "responsable", filter: true, width: 120 },
        { headerName: "Fecha de elaboracion", field: "fecha", filter: true, width: 160 },
        { headerName: "Fecha de actualizacion", field: "actualizacion", filter: true, width: 170 },
        { headerName: "Nombre del cliente", field: "cliente", filter: true, width: 150 },
        { headerName: "Estado", field: "estado", filter: true, width: 90 },
        { headerName: "Acciones", field: "acciones", filter: true, width: 100 },
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