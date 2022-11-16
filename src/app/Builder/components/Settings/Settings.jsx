import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import Fade from '@mui/material/Fade';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from "@mui/icons-material/Cancel";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import { RowForm } from './RowForm';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { setShowSettings } from '../../../../redux/building/buildingSlice';
// import { RowFormAC } from './RowFormAC';

export default function Settings({ data }) {
	const show = useSelector(state => state.building.showSettings);
	const dispatch = useDispatch();

	const [rows, setRows] = useState(data?.puntos ? JSON.parse(data?.puntos) : [{ ...defaultState, vertice: "P1" }].concat({ ...defaultState, vertice: "P2" }).concat({ ...defaultState, vertice: "P3" }));
	const [rowsAC, setRowsAC] = useState(data?.ambientes ? JSON.parse(data?.ambientes) : []);
	const [tipo, setTipo] = useState(data?.sublevel || "unidocente");
	const [zone, setZone] = useState();
	const [coordenadas, setCoordenadas] = useState(data?.coordenadas || "");

	const handleSubmit = () => {

	}

	const handleChange = (event) => {
		setTipo((event.target.value))
	}

	const handleOnChange = (index, name, value) => {
		const copyRows = [...rows];
		copyRows[index] = {
		   ...copyRows[index],
		   [name]: value
		}
		setRows(copyRows);
	}
  
	const handleOnChangeAC = (index, name, value) => {
		const copyRowsAC = [...rowsAC];
		copyRowsAC[index] = {
		   ...copyRowsAC[index],
		   [name]: value
		}
		setRowsAC(copyRowsAC);
	}
  
	const handleOnAdd = () => {
		var ultimo = rows.length;
		if (rows[ultimo - 1].lado === "P" + ultimo + " - P" + (ultimo + 1)) {
		   setRows([...rows, { ...defaultState, lado: `P${ultimo + 1} - P${ultimo + 2}`, vertice: `P${ultimo + 1}`, }]);
		}
	}
  
	const handleOnAddAC = (ambiente) => {
		const verificador = rowsAC.find((item) => item.ambienteComplementario === ambiente);
		if (!verificador && ambiente !== "") {
			setRowsAC([...rowsAC, { capacidad: 0, ambienteComplementario: ambiente }]);
		}
	}
	
	if (show) {
		return (
			<Container style={{ position: "absolute", zIndex: 2, backgroundColor: "#ffff", width: "30vw", height: "91.5%" }}>
				<div style={{display: "flex", justifyContent: "space-between", padding: "1rem 0"}}>
					<h2>Ajustes</h2>
					<CancelIcon onClick={() => dispatch(setShowSettings({ showSettings: false }))} className="pointer" />
				</div>
				<Formik
					// initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
				{({ errors, touched }) => (
					<Form>
							{/* <Grid item xs={12} sm={12} lg={5}> */}
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<span>NOMBRE:</span><br />
										<Field style={styleInput} type="text" name="name" placeholder={`${data?.name ? data.name : "Ingrese nombre del proyecto"}`} />
										{errors.name && touched.name ? (
											<div style={styleError}>{errors.name}</div>
										) : null}
										{/* <ErrorMessage name="email" component="div" /> */}
									</Grid>

									<Grid item xs={12}>
										<span>TIPOLOGIA</span> <br />
										<Field style={{ ...styleInput, marginTop: ".5rem" }} type="text" name="tipologia" />
										{errors.tipologia && touched.tipologia ? (
											<div style={styleError}>{errors.tipologia}</div>
										) : null}
									</Grid>

									<Grid item xs={12}>
										<div>
											<label htmlFor="zone" style={styleInput}>ZONA</label>
											<select id="zone">
												<option value="">Seleccione una zona</option>
												<option value="urbano">Urbano</option>
												<option value="rural">Rural</option>
											</select>
										</div>
									</Grid>

									<Grid item xs={6}>
										<span>AFORO MAXIMO</span> <br />
										<Field style={{ ...styleInput, marginTop: ".5rem" }} type="text" name="aforo_maximo" />
										{/* {errors.tipologia && touched.tipologia ? (
											<div style={styleError}>{errors.tipologia}</div>
										) : null} */}
									</Grid>

									<Grid item xs={6}>
										<span>CANTIDAD DE AULAS</span> <br />
										<Field style={{ ...styleInput, marginTop: ".5rem" }} type="text" name="cantidad_de_aulas" />
										{/* {errors.tipologia && touched.tipologia ? (
											<div style={styleError}>{errors.tipologia}</div>
										) : null} */}
									</Grid>

									<Grid item xs={12}>
										<span>PROVINCIA:</span> <br />
										<Field style={styleInput} type="text" name="ubication" />
										{errors.ubication && touched.ubication ? (
											<div style={styleError}>{errors.ubication}</div>
										) : null}
										{/* <ErrorMessage name="email" component="div" /> */}
									</Grid>

									<Grid item xs={12}>
										<span>DISTRITO:</span> <br />
										<Field style={styleInput} type="text" name="distrito" />
										{errors.distrito && touched.distrito ? (
											<div style={styleError}>{errors.distrito}</div>
										) : null}

										{/* <ErrorMessage name="email" component="div" /> */}
									</Grid>

									<Grid item xs={6}>
										<span>RESPONSABLE:</span> <br />
										<Field style={styleInput} type="text" name="manager" />
										{errors.manager && touched.manager ? (
											<div style={styleError}>{errors.manager}</div>
										) : null}
										{/* <ErrorMessage name="email" component="div" /> */}
									</Grid>

									<Grid item xs={6}>
										<span>CLIENTE:</span> <br />
										<Field style={styleInput} type="text" name="client" />
										{errors.client && touched.client ? (
											<div style={styleError}>{errors.client}</div>
										) : null}

										{/* <ErrorMessage name="email" component="div" /> */}
									</Grid>

									<Grid item xs={12}>
										{/* <span>NIVEL:</span>
										<br />

										<Grid container spacing={2} > */}

											{/* <Grid item xs={5}>
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
											</Grid> */}

											{/* <Grid item xs={7}>
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
											</Grid> */}

											{/* Input for lat and lng */}

										{/* </Grid> */}

										{/* {(inicial || primaria || secundaria) && (
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
										{(secundaria) > 0 && (nivelGrid("SECUNDARIA", aforoSecundaria, aulaSecundaria))} */}



										{/* <Button variant="contained" color="primary" onClick={handleOpen}>
											Excel
										</Button>
										<Modal
											aria-labelledby="transition-modal-title"
											aria-describedby="transition-modal-description"
											open={open}
											onClose={handleClose}
											closeAfterTransition
										>
											<Fade in={open}>
											<Box sx={styleModal}>


												<Grid container spacing={2} >
													<Grid item xs={12} lg={4}>
														<h2>Adjuntar archivo:</h2>
													</Grid>
													<Grid item xs={12} lg={8}>
														<Input type='file' accept='.xlsx, .xls' onChange={(e) => onImportExcel(e)} sx={{ display: "none" }} id="button_file" />
														<label htmlFor="button_file">
														<Button variant="outlined" component="span" style={{ width: "200px" }}>
															Subir
														</Button>
														</label>
													</Grid>
													<Grid item xs={12} lg={8} >
														<a href="/descargas/template_project.xlsx" download="Plantilla del Proyecto.xlsx">
														<Button variant="contained" color="primary" style={{ width: "200px" }}>
															Descargar Plantilla
														</Button>
														</a>
													</Grid>

													<Grid item xs={12} lg={4} >
														<Button variant="outlined" color="primary" style={{ width: "100px" }} >
														Cerrar
														</Button>
													</Grid>
												</Grid>



											</Box>
											</Fade>
										</Modal> */}

										<Grid container spacing={1} sx={{ width: "100%", marginTop: "10px" }}>
											<Grid item xs={2}>
												<span>VERTICE</span>
											</Grid>
											<Grid item xs={2}>
												<span>LADO</span>
											</Grid>
											<Grid item xs={2}>
												<span>DIST.</span>
											</Grid>
											<Grid item xs={3}>
												<span>ÁNGULO</span>
											</Grid>
											<Grid item xs={2}>
												<span>RETIROS:</span>
											</Grid>
		{/* 
											{rows.map((row, index) => (
											<RowForm
												{...row}
												onChange={(name, value) => handleOnChange(index, name, value)}
												onRemove={() => handleOnRemove(index)}
												key={index}
												disabledDeleted={index}
												error={errors.rows && errors.rows[index]}
											/>
											))} */}
											<Button sx={{ marginTop: "1rem" }} variant='outlined' onClick={handleOnAdd}>Agregar</Button>
										</Grid>

										{false ? (
											<CircularProgress />
										) : (
											<Grid item xs={12} marginTop="1rem">
											<Grid container spacing={1} sx={{ width: "100%" }}>
												{/* <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginTop: "1rem" }}></Box> */}


												<Grid item xs={5} >
													<span >{!!rowsAC.length && "AMBIENTES COMPLEMENTARIOS"}</span>
												</Grid>
												<Grid item xs={3}>
													<span>{!!rowsAC.length && "AFORO MAXIMO"}</span>
												</Grid>
												{rowsAC.map((row, index) => (
													<RowFormAC
														{...row}
														onChange={(name, value) => handleOnChangeAC(index, name, value)}
														onRemove={() => handleOnRemoveAC(index)}
														key={index}
														disabledDeleted={index}
													/>
												))}
												<Grid item xs={12}>
													Seleccionar Ambientes complementarios
													<select style={{ ...styleInput, marginTop: "1rem", marginBottom: "1rem" }} onChange={(e) => handleOnAddAC(e.target.value)}  >
														<option value="">Seleccione</option>

														{ambientesComplementarios?.map(ambiente => (
														<option key={ambiente.ambienteComplementario} value={ambiente.ambienteComplementario}>{ambiente.ambienteComplementario}</option>
														))}
													</select>
												</Grid>

												{/* <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginBottom: "1rem" }}></Box> */}

											</Grid>
											</Grid>
										)}
									</Grid>
								</Grid>
							{/* </Grid> */}
						<Button variant="contained" type="submit" sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
							Guardar
						</Button>
					</Form>
				)}
				</Formik>
		 </Container>
		)
	} else {
		return null;
	}
}

export const styleInput = {
	width: "100%",
}
 const styleError = {
	color: "red",
	marginTop: "0.25rem",
}

const ambientesComplementarios = [
	{ capacidad: 0, ambienteComplementario: "Aula" },
	{ capacidad: 0, ambienteComplementario: "Laboratorio" },
	{ capacidad: 0, ambienteComplementario: "Sala de Clases" },
	{ capacidad: 0, ambienteComplementario: "Sala de Juntas" },
	{ capacidad: 0, ambienteComplementario: "Sala de Reuniones" },
	{ capacidad: 0, ambienteComplementario: "Sala de Trabajo" },
]

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
	// coordenadas: yup.string().required('Las coordenadas son requeridas'),
	//array de objetos
	rows: yup.array().of(
	   yup.object().shape({
		  vertice: yup.string().required('El vertice es requerido'),
		  lado: yup.string().required('El lado es requerido'),
		  distancia: yup.string().required('La distancia es requerida'),
		  angulo: yup.string().required('El angulo es requerido'),
		  retiros: yup.string().required('Los retiros son requeridos'),
	   })
	)
}).defined();

const defaultState = {
	vertice: "",
	lado: "",
	dist: 0,
	angulo: 0,
	retiros: 0
};
