import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { Alert, Button, Card, Checkbox, Container, FormControlLabel, Grid, Input, Radio, RadioGroup } from '@mui/material';
import * as XLSX from 'xlsx';
import { plataformAxios } from '../../../services/zonesService';
import { UpperLowerCase } from '../../../utils/utils';
import { RowForm } from './RowForm';
import * as yup from 'yup';

export const styleInput = {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
}

const initialValues = {
    name: "",
    tipologia: "",
    ubication: "",
    distrito: "",
    client: "",
    manager: "",
    zone: "",
    parent_id: 0,
    capacity: 0,
    student: 0,
    room: 0,
    height: 0,
    width: 0,
    type: 1
}

//  capturar errores con yup
const validationSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    tipologia: yup.string().required('La tipologia es requerida'),
    ubication: yup.string().required('La ubicacion es requerida'),
    distrito: yup.string().required('El distrito es requerido'),
    client: yup.string().required('El cliente es requerido'),
    manager: yup.string().required('El responsable es requerido'),
    zone: yup.string().required('La zona es requerida'),
    parent_id: yup.number().required('El padre es requerido'),
    capacity: yup.number().required('La capacidad es requerida'),
    student: yup.number().required('La capacidad de estudiantes es requerida'),
    room: yup.number().required('La capacidad de aulas es requerida'),
    height: yup.number().required('La altura es requerida'),
    width: yup.number().required('La anchura es requerida'),
}).defined();

const defaultState = {
    vertice: "",
    lado: "",
    dist: "",
    angulo: "",
    retiros: "",
    disabled: false,
};

const NewProjectForm = ({ proyecto }) => {

    const [rows, setRows] = useState([defaultState]);
    // const [dataForm1, setDataForm1] = useState();
    const [tipo, setTipo] = useState("unidocente");
    const [aforoInicial, setAforoInicial] = useState(0)
    const [aulaInicial, setAulaInicial] = useState(0)
    const [aforoPrimaria, setAforoPrimaria] = useState(0)
    const [aulaPrimaria, setAulaPrimaria] = useState(0)
    const [aforoSecundaria, setAforoSecundaria] = useState(0)
    const [aulaSecundaria, setAulaSecundaria] = useState(0)
    const [dataExcel, setDataExcel] = useState();
    const [inicial, setInicial] = useState(false);
    const [primaria, setPrimaria] = useState(false);
    const [secundaria, setSecundaria] = useState(false);
    const [zonas, setZonas] = useState();

    //Obtener las zonas
    const getZones = async () => {
        const data = await plataformAxios.get(`zones`);
        setZonas(data.data.zones);
    }


    useEffect(() => {
        getZones();
    }, []);


    // Leer el excel para obtener 
    useEffect(() => {
        if (dataExcel) {
            setAforoInicial(dataExcel[3].__EMPTY_2)
            setAulaInicial(Math.round(dataExcel[3].__EMPTY_6))
            if (dataExcel[3].__EMPTY_2 > 0 || dataExcel[3].__EMPTY_6 > 0) {
                setInicial(true)
            }
            setAforoPrimaria(dataExcel[12].__EMPTY_2)
            setAulaPrimaria(Math.round(dataExcel[12].__EMPTY_6))
            if (dataExcel[12].__EMPTY_2 > 0 && dataExcel[12].__EMPTY_6 > 0) {
                setPrimaria(true)
            }
            setAforoSecundaria(dataExcel[21].__EMPTY_2)
            setAulaSecundaria(Math.round(dataExcel[21].__EMPTY_6))
            if (dataExcel[21].__EMPTY_2 > 0 && dataExcel[21].__EMPTY_6 > 0) {
                setSecundaria(true)
            }
        }
    }, [dataExcel])

    // Se agrega automaticamente el lado y el vertice segun se agregue nuevo campo
    for (let index = 0; index < rows.length; index++) {
        rows[index].vertice = `P${index + 1}`;
        rows[index].lado = `P${index + 1} - P${index + 2}`;
    }



    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
            ...copyRows[index],
            [name]: value
        };
        setRows(copyRows);
    };

    const handleOnAdd = () => {
        var ultimo = rows.length;
        if (rows[ultimo - 1].lado === "P" + ultimo + " - P" + (ultimo + 1)) {
            setRows([...rows, { ...defaultState, lado: `P${ultimo + 1} - P${ultimo + 2}`, vertice: `P${ultimo + 1}`, }]);
        } else {
            setRows([...rows, { ...defaultState, lado: `P${ultimo + 1} - P${ultimo + 2}`, vertice: `P${ultimo + 1}`, }]);
        }
    }
    //     setRows(rows.concat(defaultState));
    // };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
    };

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <label htmlFor={props.id || props.name}>{label}</label>
                <select {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };
    const onSubmit = async (values) => {
        // setDataForm1(values);
        const dataComplete = {
            ...values,
            ubication: `${values.ubication} ${values.distrito}`,
            level: `${aulaInicial ? "Inicial" : ""} ${aulaPrimaria ? "Primaria" : ""} ${aulaSecundaria ? "Secundaria" : ""}`,
            // rows,
            // aforoInicial, aulaInicial, aforoPrimaria, aulaPrimaria, aforoSecundaria, aulaSecundaria, 
            sublevel: tipo
        };
        console.log(dataComplete);
        const data = await plataformAxios.post(`projects`, dataComplete);
        console.log(data);

    }

    const handleChange = (event) => {
        setTipo((event.target.value))
    };

    const onImportExcel = file => {
        const { files } = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = [];
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    }
                }
                setDataExcel(data);
            } catch (e) {
                <Alert severity="error">Archivo Incorrecto</Alert>
                return;
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }

    const nivelGrid = (label, aforo, aula) => {
        return (
            <Grid container spacing={2} marginBottom=".5rem">
                <Grid item xs={4}>
                    <Field style={{ ...styleInput, textAlign: "center", fontSize: "16px" }} type="text" value={label} disabled />
                </Grid>
                <Grid item xs={4}>
                    <Field style={{ ...styleInput, textAlign: "center", fontSize: "16px" }} value={aforo} disabled />
                </Grid>
                <Grid item xs={4}>
                    <Field style={{ ...styleInput, textAlign: "center", fontSize: "16px" }} value={aula} disabled />
                </Grid>
            </Grid>
        )
    }
    return (
        <Card sx={{ height: "100%" }}>
            <Container>

                <h2>Crear proyecto nuevo de {proyecto}</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Grid container spacing={1} >
                                        <Grid item xs={12}>
                                            <span>NOMBRE:</span><br />
                                            <Field style={styleInput} type="text" name="name" />
                                            {errors.name && touched.name ? (
                                                <div>{errors.name}</div>
                                            ) : null}
                                            {/* <ErrorMessage name="email" component="div" /> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <span>TIPOLOGIA:</span> <br />
                                            <Field style={styleInput} type="text" name="tipologia" />
                                            {errors.tipologia && touched.tipologia ? (
                                                <div>{errors.tipologia}</div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12}>

                                            <MySelect style={styleInput} name="zone" label="ZONA" >
                                                <option value="">Seleccione una zona</option>

                                                {zonas?.map(zona => (
                                                    <option key={zona.id} value={zona.name}>{UpperLowerCase(zona.name)}</option>
                                                ))}

                                            </MySelect>
                                        </Grid>
                                    </Grid>
                                    Nivel
                                    <Grid container spacing={2} >


                                        <Grid item xs={5}>
                                            <div role="group" aria-labelledby="my-radio-group" style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>

                                                <label>
                                                    <Checkbox checked={inicial} onClick={() => setInicial(!inicial)} />
                                                    Inicial
                                                </label>
                                                <label>
                                                    <Checkbox checked={primaria} onClick={() => setPrimaria(!primaria)} />
                                                    Primaria
                                                </label>
                                                <label>
                                                    <Checkbox checked={secundaria} onClick={() => setSecundaria(!secundaria)} />
                                                    Secundaria
                                                </label>
                                            </div>

                                        </Grid>
                                        <Grid item xs={7}>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                // name="tipo"
                                                onChange={handleChange}
                                                value={tipo}


                                            >
                                                <FormControlLabel value="unidocente" control={<Radio />} label="UNIDOCENTE" />
                                                <FormControlLabel value="polidocente multigrado" control={<Radio />} label="POLIDOCENTE MULTIGRADO" />
                                                <FormControlLabel value="polidocente completo" control={<Radio />} label="POLIDOCENTE COMPLETO" />
                                            </RadioGroup>

                                        </Grid>


                                    </Grid>
                                    {(inicial || primaria || secundaria) && (
                                        <Grid container>
                                            <Grid item xs={4} textAlign="center" >
                                                <span>GRADO</span>
                                            </Grid>
                                            <Grid item xs={4} textAlign="center">
                                                <span>AFORO POR GRADO</span>
                                            </Grid>
                                            <Grid item xs={4} textAlign="center">
                                                <span>CANTIDAD DE AULAS</span>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {inicial && (nivelGrid("INICIAL", aforoInicial, aulaInicial))}
                                    {(primaria) > 0 && (nivelGrid("PRIMARIA", aforoPrimaria, aulaPrimaria))}
                                    {(secundaria) > 0 && (nivelGrid("SECUNDARIA", aforoSecundaria, aulaSecundaria))}


                                    {/* <Button> */}
                                    <Input color='primary' type='file' accept='.xlsx, .xls' onChange={(e) => onImportExcel(e)} />
                                    {/* </Button> */}
                                    {/* descargar excel */}
                                    <a href="/descargas/test.xlsx" download="Centros de Educaclientcion.xlsx">
                                        <Button variant="contained" color="primary" onClick={() => downloadExcel()}>
                                            Descargar Excel
                                        </Button>
                                    </a>
                                    <br /> <br />

                                    UBICACIÓN

                                    <Grid container spacing={1} >
                                        <Grid item xs={12}>
                                            <span>Provincia:</span> <br />
                                            <Field style={styleInput} type="text" name="ubication" />
                                            {errors.ubication && touched.ubication ? (
                                                <div>{errors.ubication}</div>
                                            ) : null}
                                            {/* <ErrorMessage name="email" component="div" /> */}

                                        </Grid>
                                        <Grid item xs={12}>
                                            <span>Distrito:</span> <br />
                                            <Field style={styleInput} type="text" name="distrito" />
                                            {errors.distrito && touched.distrito ? (
                                                <div>{errors.distrito}</div>
                                            ) : null}

                                            {/* <ErrorMessage name="email" component="div" /> */}

                                        </Grid>
                                        <Grid item xs={6}>
                                            <span>Responsable:</span> <br />
                                            <Field style={styleInput} type="text" name="manager" />
                                            {errors.manager && touched.manager ? (
                                                <div>{errors.manager}</div>
                                            ) : null}
                                            {/* <ErrorMessage name="email" component="div" /> */}

                                        </Grid>
                                        <Grid item xs={6}>
                                            <span>Cliente:</span> <br />
                                            <Field style={styleInput} type="text" name="client" />
                                            {errors.client && touched.client ? (
                                                <div>{errors.client}</div>
                                            ) : null}

                                            {/* <ErrorMessage name="email" component="div" /> */}

                                        </Grid>


                                    </Grid>
                                </Grid>


                                <Grid item xs={6}>
                                    <Grid container spacing={1} sx={{ width: "100%" }}>
                                        <Grid item xs={2} >
                                            <span >VERTICE</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>LADO</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>DIST.</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span>ÁNGULO</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>RETIROS:</span>
                                        </Grid>


                                        {rows.map((row, index) => (
                                            <RowForm
                                                {...row}
                                                onChange={(name, value) => handleOnChange(index, name, value)}
                                                onRemove={() => handleOnRemove(index)}
                                                key={index}
                                            />

                                        ))}
                                        <Button variant='outlined' onClick={handleOnAdd}>Agregar</Button>
                                    </Grid>
                                    <Button variant="contained" type="submit">
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>

                        </Form>
                    )}
                </Formik>
            </Container>

        </Card>
    )
};

export default NewProjectForm;