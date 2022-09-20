import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as XLSX from 'xlsx';
import { plataformAxios } from '../../../services/zonesService';
import { UpperLowerCase } from '../../../utils/utils';
import { RowForm } from './RowForm';
import * as yup from 'yup';
import { RowFormAC } from './RowFormAC';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import { useSelector } from 'react-redux';
import { Fade, Modal } from '@mui/material';
import { getData } from '../../../services/spreadsheetService';

export const styleInput = {
   width: "100%",
}
const styleError = {
   color: "red",
   marginTop: "0.25rem",
}

const styleModal = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'white',
   borderRadius: '10px',
   boxShadow: 24,
   width: "400px",
   p: 4,
   "@media (max-width: 768px)": {
      width: "auto",
   }
};


const NewProjectForm = ({ data, onClose, setMutate }) => {

   const id = useSelector((state) => state.auth.uid);
   const [rows, setRows] = useState(data?.puntos ? JSON.parse(data?.puntos) : [{ ...defaultState, vertice: "P1" }].concat({ ...defaultState, vertice: "P2" }).concat({ ...defaultState, vertice: "P3" }));
   const [rowsAC, setRowsAC] = useState(data?.ambientes ? JSON.parse(data?.ambientes) : []);
   const [tipo, setTipo] = useState(data?.sublevel || "unidocente");
   const [zone, setZone] = useState();
   const [aforoInicial, setAforoInicial] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoInicial : 0);
   const [aulaInicial, setAulaInicial] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaInicial : 0);
   const [aforoPrimaria, setAforoPrimaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoPrimaria : 0);
   const [aulaPrimaria, setAulaPrimaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaPrimaria : 0);
   const [aforoSecundaria, setAforoSecundaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aforoSecundaria : 0);
   const [aulaSecundaria, setAulaSecundaria] = useState(data?.aforo ? JSON.parse(data?.aforo).aulaSecundaria : 0);
   const [dataExcel, setDataExcel] = useState();
   const [inicial, setInicial] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoInicial : false);
   const [primaria, setPrimaria] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoPrimaria : false);
   const [secundaria, setSecundaria] = useState(data?.aforo ? !!JSON.parse(data?.aforo).aforoSecundaria : false);
   const [zonas, setZonas] = useState();
   const [coordenadas, setCoordenadas] = useState(data?.coordenadas || "");
   const [step, setStep] = useState(1);
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   console.log(!!rowsAC.length)

   const imageToAulas = () => {
      if (aforoInicial > 0 && aforoPrimaria > 0 && aforoSecundaria > 0) {
         return "inicial_primaria_secundaria.png"
      }
      if (aforoInicial > 0 && aforoPrimaria > 0) {
         return "inicial_primaria.png"
      }
      if (aforoInicial > 0 && aforoSecundaria > 0) {
         return "primaria_secundaria.png"
      }
      if (aforoPrimaria > 0 && aforoSecundaria > 0) {
         return "primaria_secundaria.png"
      }
      if (aforoInicial > 0) {
         return "inicial.png"
      }
      if (aforoPrimaria > 0) {
         return "primaria.png"
      }
      if (aforoSecundaria > 0) {
         return "secundaria.png"
      }
      if (!aforoPrimaria && !aforoSecundaria && !aforoInicial)
         return "secundaria.png"
   }

   const initialValues = {
      name: "",
      tipologia: data?.tipologia || "",
      ubication: data?.ubication || "",
      distrito: data?.distrito || "",
      client: data?.client || "",
      manager: data?.manager || "",
      zone: data?.zone || "",
      parent_id: data?.parent_id == 0 ? data.id : data?.parent_id || 0,
      capacity: 0,
      student: 0,
      room: 0,
      height: 0,
      width: 0,
      type_id: data?.type_id || 1,
      coordenadas: "",
   }

   //Obtener las zonas desde el api
   const getZones = async () => {
      const data = await plataformAxios.get(`zones`);
      setZonas(data.data.zones);
   }
   useEffect(() => {
      getZones();
   }, []);

   // Leer el excel y colocar en la columna de aulas
   useEffect(() => {
      if (dataExcel) {
         for (var key of Object.keys(dataExcel)) {
            if (key === "inicial") {
               setAforoInicial(dataExcel[key].aforo);
               setAulaInicial(dataExcel[key].aulas);
               setInicial(true);
            }
            else if (key === "primaria") {
               setAforoPrimaria(dataExcel[key].aforo);
               setAulaPrimaria(dataExcel[key].aulas);
               setPrimaria(true);
            }
            else if (key === "secundaria") {
               setAforoSecundaria(dataExcel[key].aforo);
               setAulaSecundaria(dataExcel[key].aulas);
               setSecundaria(true);
            }
         }

         // setAforoInicial(dataExcel[3].__EMPTY_2)
         // setAulaInicial(Math.round(dataExcel[3].__EMPTY_6))
         // if (dataExcel[3].__EMPTY_2 > 0 || dataExcel[3].__EMPTY_6 > 0) {
         //    setInicial(true)
         // }
         // setAforoPrimaria(dataExcel[12].__EMPTY_2)
         // setAulaPrimaria(Math.round(dataExcel[12].__EMPTY_6))
         // if (dataExcel[12].__EMPTY_2 > 0 && dataExcel[12].__EMPTY_6 > 0) {
         //    setPrimaria(true)
         // }
         // setAforoSecundaria(dataExcel[21].__EMPTY_2)
         // setAulaSecundaria(Math.round(dataExcel[21].__EMPTY_6))
         // if (dataExcel[21].__EMPTY_2 > 0 && dataExcel[21].__EMPTY_6 > 0) {
         //    setSecundaria(true)
         // }
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

   const handleOnChangeAC = (index, name, value) => {
      const copyRowsAC = [...rowsAC];
      copyRowsAC[index] = {
         ...copyRowsAC[index],
         [name]: value
      };
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

   const handleOnRemove = index => {
      const copyRows = [...rows];
      copyRows.splice(index, 1);
      setRows(copyRows);
   };

   const handleOnRemoveAC = index => {
      const copyRowsAC = [...rowsAC];
      copyRowsAC.splice(index, 1);
      setRowsAC(copyRowsAC);
   }

   const Select = ({ label, ...props }) => {
      const [field, meta] = useField(props);
      return (
         <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} onChangeCapture={(evt) => setZone(evt.target.value)} {...props} />
            {meta.touched && meta.error ? (
               <div style={styleError}>{meta.error}</div>
            ) : null}
         </div>
      );
   };

   const allDataAforo = {
      aforoInicial: aforoInicial,
      aulaInicial: aulaInicial,
      aforoPrimaria: aforoPrimaria,
      aulaPrimaria: aulaPrimaria,
      aforoSecundaria: aforoSecundaria,
      aulaSecundaria: aulaSecundaria,
   }

   const onSubmit = async (values) => {

      const dataComplete = {
         ...values,
         ubication: values.ubication,
         level: `${aulaInicial ? "Inicial" : ""} ${aulaPrimaria ? "Primaria" : ""} ${aulaSecundaria ? "Secundaria" : ""}`,
         puntos: JSON.stringify(rows),
         aforo: JSON.stringify(allDataAforo),
         ambientes: JSON.stringify(rowsAC),
         sublevel: tipo,
         coordenadas: coordenadas,
         user_id: id
      };

      const data = await plataformAxios.post(`projects`, dataComplete);

      if (data.data.proyectos.parent_id == 0) {

         const dataHijo = await plataformAxios.post(`projects`, { ...dataComplete, parent_id: data.data.proyectos.id, name: "VERSION 1" });
         if (!!dataHijo.data.proyectos) {
            setMutate(Math.random());
            setStep(2);
         }
      }
      if (data.data.proyectos.parent_id != 0) {
         setMutate(Math.random());
         setStep(2);
      }


   }

   const handleChange = (event) => {
      setTipo((event.target.value))
   };

   const onImportExcel = async (file) => {
      handleClose();
      const { files } = file.target;
      var levels = [];
      console.log(aulaInicial)
      if (inicial) levels.push("inicial");
      if (primaria) levels.push("primaria");
      if (secundaria) levels.push("secundaria");
      const data = JSON.stringify({ zone, levels, type: tipo }); // '{"zone": "urbano", "levels": ["inicial", "secundaria"], "type": "polidocente multigrado"}'
      var res = await getData(files[0], data);
      setDataExcel(res.data);



      // const fileReader = new FileReader();
      // fileReader.onload = event => {
      //    try {
      //       const { result } = event.target;
      //       const workbook = XLSX.read(result, { type: 'binary' });
      //       let data = [];
      //       for (const sheet in workbook.Sheets) {
      //          if (workbook.Sheets.hasOwnProperty(sheet)) {
      //             data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
      //          }
      //       }
      //       setDataExcel(data);
      //    } catch (e) {
      //       <Alert severity="error">Archivo Incorrecto</Alert>
      //       return;
      //    }
      // };
      // fileReader.readAsBinaryString(files[0]);
   }

   const nivelGrid = (label, aforo, aula) => {
      return (
         <Grid container spacing={2} marginBottom="1rem" >
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
      <Card>
         {step === 1 &&
            <Container >
               <h2 style={{ marginBottom: "1.5rem" }}>Crear proyecto nuevo</h2>
               <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
               >
                  {({ errors, touched }) => (
                     <Form>
                        <Grid container spacing={5}>
                           <Grid item xs={12} sm={12} lg={12}>
                              <Grid container spacing={1} >
                                 <Grid item xs={12}>
                                    <span >NOMBRE:</span><br />
                                    <Field style={styleInput} type="text" name="name" placeholder={`${data?.name ? data.name : "Ingrese nombre del proyecto"}`} />
                                    {errors.name && touched.name ? (
                                       <div style={styleError}>{errors.name}</div>
                                    ) : null}
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                 </Grid>

                                 <Grid item xs={12} lg={6}>
                                    <span >TIPOLOGIA</span> <br />
                                    <Field style={{ ...styleInput, marginTop: ".5rem" }} type="text" name="tipologia" />
                                    {errors.tipologia && touched.tipologia ? (
                                       <div style={styleError}>{errors.tipologia}</div>
                                    ) : null}
                                 </Grid>

                                 <Grid item xs={12} lg={6}>
                                    <Select style={styleInput} name="zone" label="ZONA" >
                                       <option value="">Seleccione una zona</option>

                                       {zonas?.map(zona => (
                                          <option key={zona.id} value={zona.name}>{UpperLowerCase(zona.name)}</option>
                                       ))}
                                    </Select>
                                 </Grid>

                                 <Grid item xs={12}>
                                    <span>NIVEL:</span>
                                    <br />

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

                                       {/* Input for lat and lng */}

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



                                    <Button variant="contained" color="primary" onClick={handleOpen}>
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
                                    </Modal>

                                    <Grid container spacing={1} sx={{ width: "100%", marginTop: "10px" }}>
                                       <Grid item xs={2} >
                                          <span >VERTICE</span>
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

                                       {rows.map((row, index) => (
                                          <RowForm
                                             {...row}
                                             onChange={(name, value) => handleOnChange(index, name, value)}
                                             onRemove={() => handleOnRemove(index)}
                                             key={index}
                                             disabledDeleted={index}
                                             error={errors.rows && errors.rows[index]}
                                          />
                                       ))}
                                       <Button sx={{ marginTop: "1rem" }} variant='outlined' onClick={handleOnAdd}>Agregar</Button>
                                    </Grid>

                                    {false ? (
                                       <CircularProgress />
                                    ) : (
                                       <Grid item xs={12} marginTop="1rem">
                                          <Grid container spacing={1} sx={{ width: "100%" }}>
                                             <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginTop: "1rem" }}></Box>


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
                                             <Grid item xs={8}>
                                                Seleccionar Ambientes complementarios
                                                <select style={{ ...styleInput, marginTop: "1rem", marginBottom: "1rem" }} onChange={(e) => handleOnAddAC(e.target.value)}  >
                                                   <option value="">Seleccione</option>

                                                   {ambientesComplementarios?.map(ambiente => (
                                                      <option key={ambiente.ambienteComplementario} value={ambiente.ambienteComplementario}>{UpperLowerCase(ambiente.ambienteComplementario)}</option>
                                                   ))}
                                                </select>
                                             </Grid>

                                             <Box sx={{ width: "100%", height: "5px", backgroundColor: "#F3F6F9", marginBottom: "1rem" }}></Box>

                                          </Grid>
                                       </Grid>
                                    )}
                                 </Grid>
                              </Grid>
                              <Grid sx={{ marginBottom: "2rem" }} xs={12} lg={12} container spacing={3}>
                                 <Grid item xs={6}>
                                    <span>PROVINCIA:</span> <br />
                                    <Field style={styleInput} type="text" name="ubication" />
                                    {errors.ubication && touched.ubication ? (
                                       <div style={styleError}>{errors.ubication}</div>
                                    ) : null}
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                 </Grid>

                                 <Grid item xs={6}>
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
                              </Grid>
                              <Grid item xs={12} container spacing={2} justifyContent="end" >

                                 <Grid item xs={12} lg={12}>
                                    <iframe className="iframe"
                                       src={`https://maps.google.com/?ll=${coordenadas}&z=16&t=m&output=embed`}
                                       height="100%" width="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen>
                                    </iframe>
                                 </Grid>

                                 <Grid item xs={12} lg={12}>
                                    <span>Coordenadas:</span> <br />
                                    <Field style={styleInput} type="text" value={coordenadas} onChange={e => setCoordenadas(e.target.value)} name="coordenadas"
                                       required
                                    />
                                 </Grid>
                                 {/* </Grid> */}

                              </Grid>
                           </Grid>

                        </Grid>

                        <Button variant="contained" type="submit" sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                           Guardar
                        </Button>
                     </Form>
                  )}
               </Formik>

            </Container>
         }
         {step === 2 &&
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
               <Box  >

                  <Button onClick={() => {
                     onClose()
                     // setMutate(Math.random());
                  }
                  }>Cerrar</Button>
               </Box>

               <img src={`/images/${imageToAulas()}`} alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }
      </Card >
   )
};

export default NewProjectForm;




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
   ),


}).defined();

const defaultState = {
   vertice: "",
   lado: "",
   dist: 0,
   angulo: 0,
   retiros: 0,
};