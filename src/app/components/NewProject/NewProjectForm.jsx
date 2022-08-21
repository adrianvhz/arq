import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { Alert, Button, Checkbox, FormControlLabel, Grid, Input, Radio, RadioGroup } from '@mui/material';
import * as XLSX from 'xlsx';

const styleInput = {
    width: "100%",
    padding: "5px 0",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
}

const initialValues = {
    nombre: "",
    tipologia: "",
    provincia: "",
    distrito: "",
    cliente: "",
    responsable: "",
    checked: [],
    zona: "",
    aforoInicial: 0,
    aforoPrimaria: 0,
    aforoSecundaria: 0,
}



function Row({ onChange, onRemove, vertice, lado, dist, angulo, retiros }) {

    return (
        <Grid container spacing={1} sx={{ marginBottom: ".5rem" }}>
            <Grid item xs={2}>
                <input
                    value={vertice}
                    // onChange={e => onChange("vertice", e.target.value)}
                    disabled
                    style={{ ...styleInput, textAlign: "center" }}
                // placeholder="Nombre del contacto"
                />
            </Grid>
            <Grid item xs={2}>

                <input
                    // placeholder="Email"
                    style={{ ...styleInput, textAlign: "center" }}

                    value={lado}
                    onChange={e => onChange("lado", e.target.value)}

                />
            </Grid>

            <Grid item xs={2}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}

                    value={dist}
                    onChange={e => onChange("dist", e.target.value)}
                />
            </Grid>

            <Grid item xs={4}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}

                    value={angulo}
                    onChange={e => onChange("angulo", e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}

                    value={retiros}
                    onChange={e => onChange("retiros", e.target.value)}
                />
            </Grid>
        </Grid>
    );
}



const NewProjectForm = () => {

    const defaultState = {
        vertice: "",
        lado: "",
        dist: "",
        angulo: "",
        retiros: ""
    };

    const [rows, setRows] = useState([defaultState]);
    const [dataForm1, setDataForm1] = useState();


    const [value, setValue] = useState("unidocente");
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

    useEffect(() => {
        if (dataExcel) {
            setAforoInicial(dataExcel[3].__EMPTY_2)
            setAulaInicial(Math.round(dataExcel[3].__EMPTY_6))
            if (dataExcel[3].__EMPTY_2 > 0 || dataExcel[3].__EMPTY_6 > 0) {
                setInicial(true)
                console.log("inicial")
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

        if (rows.length === 1) {
            rows[index].lado = `P1`;
            rows[index].vertice = `P${index + 1}`;
            break
        }
        if (rows.length !== 0) {
            rows[index].vertice = `P${index + 1}`;
            rows[index].lado = `P${index + 1} - P${index + 2}`;
        }

        if (index === rows.length - 1 && index !== 0) {
            rows[index].lado = `P${index + 1} - P1`;
        }

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
        setRows(rows.concat(defaultState));
    };

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
    const onSubmit = (values) => {
        setDataForm1(values);
        console.log(values)
    }

    const handleChange = (event) => {
        setValue((event.target.value))
    };

    const onImportExcel = file => {
        // Obtener el objeto del archivo cargado
        const { files } = file.target;

        // Leer el archivo a través del objeto FileReader
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // Leer en secuencia binaria para obtener todo el objeto de tabla de Excel
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = []; // almacena los datos obtenidos
                // recorre cada hoja de trabajo para leer (aquí solo se lee la primera tabla por defecto)
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // usa el método sheet_to_json para convertir Excel a datos json
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // Si solo se toma la primera tabla, descomenta esta línea
                    }
                }
                setDataExcel(data);
            } catch (e) {
                // Aquí puede lanzar una solicitud relacionada para un error de tipo de archivo incorrecto
                <Alert severity="error">Archivo Incorrecto</Alert>
                return;
            }
        };
        // Abre el archivo en modo binario
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
        <div>
            <h2>Crear proyecto nuevo</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Grid container spacing={1} >
                                    <Grid item xs={12}>
                                        <span>NOMBRE:</span><br />
                                        <Field style={styleInput} type="text" name="nombre" />
                                        {/* <ErrorMessage name="email" component="div" /> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <span>TIPOLOGIA:</span> <br />
                                        <Field style={styleInput} type="text" name="tipologia" />
                                        {/* <ErrorMessage name="email" component="div" /> */}
                                    </Grid>
                                    <Grid item xs={12}>

                                        <MySelect style={styleInput} name="zona" label="ZONA" >
                                            <option value="">Seleccione una provincia</option>
                                            <option value="Lima">Lima</option>
                                            <option value="San Martin">San Martin</option>
                                            <option value="Callao">Callao</option>

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
                                            onChange={handleChange}
                                            value={value}

                                        >
                                            <FormControlLabel value="unidocente" control={<Radio />} label="UNIDOCENTE" />
                                            <FormControlLabel value="polidocente" control={<Radio />} label="POLIDOCENTE MULTIGRADO" />
                                            <FormControlLabel value="completo" control={<Radio />} label="POLIDOCENTE COMPLETO" />
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

                                {(inicial && aforoInicial) > 0 && (nivelGrid("INICIAL", aforoInicial, aulaInicial))}
                                {(primaria && aforoPrimaria) > 0 && (nivelGrid("PRIMARIA", aforoPrimaria, aulaPrimaria))}
                                {(secundaria && aforoSecundaria) > 0 && (nivelGrid("SECUNDARIA", aforoSecundaria, aulaSecundaria))}


                                {/* <Button> */}
                                <Input color='primary' type='file' accept='.xlsx, .xls' onChange={(e) => onImportExcel(e)} />
                                {/* </Button> */}
                                {/* descargar excel */}
                                <a href="/descargas/test.xlsx" download="Centros de Educacion.xlsx">
                                    <Button variant="contained" color="primary" onClick={() => downloadExcel()}>
                                        Descargar Excel
                                    </Button>
                                </a>
                                <br /> <br />

                                UBICACIÓN

                                <Grid container spacing={1} >
                                    <Grid item xs={12}>
                                        <span>Provincia:</span> <br />
                                        <Field style={styleInput} type="text" name="provincia" />
                                        {/* <ErrorMessage name="email" component="div" /> */}

                                    </Grid>
                                    <Grid item xs={12}>
                                        <span>Distrito:</span> <br />
                                        <Field style={styleInput} type="text" name="distrito" />
                                        {/* <ErrorMessage name="email" component="div" /> */}

                                    </Grid>
                                    <Grid item xs={6}>
                                        <span>Responsable:</span> <br />
                                        <Field style={styleInput} type="text" name="responsable" />
                                        {/* <ErrorMessage name="email" component="div" /> */}

                                    </Grid>
                                    <Grid item xs={6}>
                                        <span>Cliente:</span> <br />
                                        <Field style={styleInput} type="text" name="cliente" />
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
                                        <Row
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
        </div>
    )
};

export default NewProjectForm;