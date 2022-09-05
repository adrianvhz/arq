import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { RowList } from './RowList';

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
}

const containerCustom = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "1000px",
    // overflowX: "scroll",

    '@media (max-width: 1024px)': {
        width: '85%',
        height: '100%',
        // top: '25%',

        // transform: 'translate(0, 0)',
        // borderRadius: '0',
    }



}
const GridData = (data) => {

    const [dataCompleta] = useState(data.data)
    const [dataFiltrada, setDataFiltrada] = useState([])
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    console.log(dataFiltrada, "dataFiltrada")

    // useEffect(() => {
    //     setDataFiltrada(data.data)
    // }, [])

    const options = (e) => {
        switch (e) {
            case "0":
                setDataFiltrada(dataCompleta)
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
        const filtro = dataCompleta.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setDataFiltrada(filtro)
    }

    function toMs(dateStr) {
        let parts = dateStr.split("/")
        return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
    }


    //filtro por rango de fechas
    const dataFilterDateRange = () => {

        if (fechaInicio && fechaFin) {
            const filtro = dataCompleta.filter((item) => {
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
        // if (fechaInicio === 'Invalid date' || fechaFin === 'Invalid date') {
        //     setDataFiltrada(data.data)
        //     return
        // }
        if (!fechaInicio || !fechaFin || fechaInicio === 'Invalid date' || fechaFin === 'Invalid date') {
            setDataFiltrada(data.data)
            return
        }


    }, [fechaInicio, fechaFin])



    return (
        <div style={containerCustom} >

            <Grid container spacing={3} sx={{ marginBottom: "1.75rem" }}>
                <Grid item xs={4}>
                    <label>Buscar</label>
                    <input type="text" placeholder="Escribe aquí" style={{ width: "100%" }} onChange={(e) => dataFilter(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <label>Desde</label>
                    <input type="date" className="" style={{ width: "100%" }}
                        // onChange={(e) => dataFilterDate(moment(e.target.value).format('DD/MM/YYYY'))} 
                        onChange={(e) => setFechaInicio(moment(e.target.value).format('DD/MM/YYYY'))}

                    />

                </Grid>
                <Grid item xs={3}>
                    <label>Hasta</label>
                    <input type="date" className="" style={{ width: "100%" }}
                        onChange={(e) => setFechaFin(moment(e.target.value).format('DD/MM/YYYY'))}

                    />
                </Grid>
                <Grid item xs={2}>
                    <label>Mostrar</label>
                    <select style={{ width: "100%" }} onChange={(e) => options(e.target.value)}>
                        <option value="0">Todos</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </Grid>
            </Grid>
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
            {dataFiltrada.map((row, index) =>
                <RowList key={index} row={row} index={index} data={dataFiltrada} />
            )}




        </div>
    )
}

export default GridData