import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { Grid, Input } from '@mui/material';

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
}

const defaultState = {
    vertice: "",
    lado: "",
    dist: "",
    angulo: "",
    retiros: ""
};



const NewProjectForm = () => {
    const [rows, setRows] = useState([defaultState]);
    const [form, setForm] = useState(true);
    const [dataForm1, setDataForm1] = useState();

    function Row({ onChange, onRemove, vertice, lado, dist, angulo, retiros }) {
        return (
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <input
                        value={vertice}
                        onChange={e => onChange("vertice", e.target.value)}
                    // placeholder="Nombre del contacto"
                    />
                </Grid>
                <Grid item xs={2}>

                    <input
                        // placeholder="Email"
                        value={lado}
                        onChange={e => onChange("lado", e.target.value)}
                    />
                </Grid>

                <Grid item xs={2}>

                    <input

                        value={dist}
                        onChange={e => onChange("dist", e.target.value)}
                    />
                </Grid>

                <Grid item xs={4}>

                    <input
                        value={angulo}
                        onChange={e => onChange("angulo", e.target.value)}
                    />
                </Grid>
                {/* <Grid item xs={2}>

                    <input
                        value={retiros}
                        onChange={e => onChange("retiros", e.target.value)}
                    />
                </Grid> */}

                <button onClick={onRemove}>Eliminar</button>
            </Grid>
        );
    }

    console.log(rows)

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
                        {form ? (
                            <div>
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
                                                <Field type="checkbox" name="checked" value="inicial" />
                                                Inicial
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="primaria" />
                                                Primaria
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="secundaria" />
                                                Secundaria
                                            </label>
                                        </div>

                                    </Grid>
                                    <Grid item xs={7}>
                                        <div role="group" aria-labelledby="my-radio-group" style={{ display: "flex", flexDirection: "column", }}>
                                            <label>
                                                <Field type="checkbox" name="checked" value="unidocente" />
                                                Unidocente
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="multigrado" />
                                                Polidocente Multigrado
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="completo" />
                                                Polidocente Completo
                                            </label>
                                        </div>

                                    </Grid>
                                </Grid>
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

                                <button onClick={() => setForm(false)}>
                                    Continuar
                                </button>
                            </div>

                        ) : (
                            <div>
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
                                    <button onClick={handleOnAdd}>Agregar</button>
                                </Grid>


                                <button onClick={() => setForm(true)}>
                                    Regresar
                                </button>
                                <button type="submit">
                                    Guardar
                                </button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default NewProjectForm;