import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { RowList } from './RowList';
import { Box, Container } from '@mui/material';

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    // width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
    minWidth: "20px",
    fontWeight: 600,
}

const containerCustom = {
    // marginLeft: "2rem",
    // marginRight: "2rem",
    width: "100%",
}

const dataBoxGrid = {
    width: "100%",
    display: "flex"


}
const GridData = (data) => {

    const [dataFiltrada, setDataFiltrada] = useState([])
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const options = (e) => {
        switch (e) {
            case "0":
                setDataFiltrada(data.data)
                break;
            case "10":
                const dataCortada = dataFiltrada.slice(0, 10)
                setDataFiltrada(dataCortada)
                break
            case "50":
                const dataCortada2 = dataFiltrada.slice(0, 50)
                setDataFiltrada(dataCortada2)
                break
            case "100":
                const dataCortada3 = dataFiltrada.slice(0, 100)
                setDataFiltrada(dataCortada3)
                break

            default:
                console.log("error")
                break;
        }
    }

    const dataFilter = (value) => {
        const filtro = data.data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setDataFiltrada(filtro)
    }

    function toMs(dateStr) {
        let parts = dateStr.split("/")
        return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
    }



    //filtro por rango de fechas
    const dataFilterDateRange = () => {

        if (fechaInicio && fechaFin) {
            const filtro = data.data.filter((item) => {
                let date = moment(item.createdAt).format('DD/MM/YYYY')
                date = toMs(date)
                return date >= toMs(fechaInicio) && date <= toMs(fechaFin)
            })
            setDataFiltrada(filtro)

        }
    }



    useEffect(() => {
        if (fechaInicio && fechaFin && fechaInicio !== 'Invalid date' && fechaFin !== 'Invalid date') {
            dataFilterDateRange()
            return
        }
        else {
            setDataFiltrada(data.data)
        }
    }, [fechaInicio && fechaFin])


    useEffect(() => {
        setDataFiltrada(data.data)
    }, [data.data])

    return (
        <div style={{ marginLeft: "2rem", marginRight: "2rem" }} >

            <Grid container spacing={3} sx={{ marginBottom: "1.75rem" }}>
                <Grid item xs={12} sm={6} lg={4}>
                    <label>Buscar</label>
                    <input type="text" placeholder="Escribe aquí" style={{ width: "100%" }} onChange={(e) => dataFilter(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <label>Desde</label>
                    <input type="date" className="" style={{ width: "100%" }}
                        // onChange={(e) => dataFilterDate(moment(e.target.value).format('DD/MM/YYYY'))} 
                        onChange={(e) => setFechaInicio(moment(e.target.value).format('DD/MM/YYYY'))}

                    />

                </Grid>
                <Grid xs={12} item sm={6} lg={3}>
                    <label>Hasta</label>
                    <input type="date" className="" style={{ width: "100%" }}
                        onChange={(e) => setFechaFin(moment(e.target.value).format('DD/MM/YYYY'))}

                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                    <label>Mostrar</label>
                    <select style={{ width: "100%" }} onChange={(e) => options(e.target.value)}>
                        <option value="0">Todos</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </Grid>
            </Grid>
            <Box sx={{
                width: "100%",
                overflowX: "auto",
            }}>

                <div style={dataBoxGrid}>
                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        ID
                    </Box>
                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        Tipo
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "180px", width: "20%" }}>
                        Nombre del Proyecto
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
                        Ubicacion
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
                        Responsable
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                        Fecha de Elab.
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                        Fecha de Act.
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "150px", width: "20%" }}>
                        Nombre del Cliente
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "50px", width: "10%" }}>
                        Acciones
                    </Box>
                </div>


                {dataFiltrada.map((row, index) =>
                    <RowList key={index} row={row} index={index} data={dataFiltrada} icon={data.typeProject.icon} setMutate={data.setMutate} />
                )}
            </Box>





        </div>
    )
}

export default GridData