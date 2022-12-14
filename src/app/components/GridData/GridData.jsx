import { useEffect, useState } from 'react'
import moment from 'moment';
import Grid from '@mui/material/Grid';
import TableProjects from './TableProjects';

const GridData = ({ projects, typeProject, setMutate }) => {
    const [projectsFiltrados, setProjectsFiltrados] = useState([]); // este array se cambia a undefined por el call api
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const options = (e) => {
        switch (e) {
            case "0":
                setProjectsFiltrados(projects)
                break;
            case "10":
                const projectsCortados1 = projectsFiltrados.slice(0, 10)
                setProjectsFiltrados(projectsCortados1)
                break
            case "50":
                const projectsCortados2 = projectsFiltrados.slice(0, 50)
                setProjectsFiltrados(projectsCortados2)
                break
            case "100":
                const projectsCortados3 = projectsFiltrados.slice(0, 100)
                setProjectsFiltrados(projectsCortados3)
                break

            default:
                console.log("error")
                break;
        }
    }

    const dataFilter = (value) => {
        const filtro = projects.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setProjectsFiltrados(filtro)
    }

    function toMs(dateStr) {
        let parts = dateStr.split("/")
        return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
    }


    //filtro por rango de fechas
    const dataFilterDateRange = () => {

        if (fechaInicio && fechaFin) {
            const filtro = projects.filter((item) => {
                let date = moment(item.createdAt).format('DD/MM/YYYY')
                date = toMs(date)
                return date >= toMs(fechaInicio) && date <= toMs(fechaFin)
            })
            setProjectsFiltrados(filtro)

        }
    }

    useEffect(() => {
        if (fechaInicio && fechaFin && fechaInicio !== 'Invalid date' && fechaFin !== 'Invalid date') {
            dataFilterDateRange()
            return
        }
        else {
            setProjectsFiltrados(projects)
        }
    }, [fechaInicio && fechaFin])


    useEffect(() => {
        setProjectsFiltrados(projects)
    }, [projects])

    return (
        <div style={{ marginLeft: "2rem", marginRight: "2rem" }} >
            <Grid container spacing={3} sx={{ marginBottom: "1.75rem" }}>
                <Grid item xs={12} sm={6} lg={4}>
                    <label>Buscar</label>
                    <input type="text" placeholder="Escribe aquí" style={{ width: "100%" }} onChange={(e) => dataFilter(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <label>Desde</label>
                    <input type="date" style={{ width: "100%" }}
                        // onChange={(e) => dataFilterDate(moment(e.target.value).format('DD/MM/YYYY'))} 
                        onChange={(e) => setFechaInicio(moment(e.target.value).format('DD/MM/YYYY'))}

                    />

                </Grid>
                <Grid xs={12} item sm={6} lg={3}>
                    <label>Hasta</label>
                    <input type="date" style={{ width: "100%" }}
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
            
			<TableProjects
				projectsFiltrados={projectsFiltrados}
				typeProject={typeProject}
				setMutate={setMutate}
			/>
        </div>
    )
}

export default GridData;
