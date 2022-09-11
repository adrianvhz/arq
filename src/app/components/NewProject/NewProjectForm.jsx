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
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Fade, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import { MapContainer, TileLayer, useMap, Marker, Popup } from 'leaflet'


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
   p: 4,
   '@media (max-width: 1024px)': {
      width: '85%',
      left: '50%',
   }


};


const NewProjectForm = ({ data, onClose, mutate, setMutate }) => {

   const id = useSelector((state) => state.auth.uid);
   const [rows, setRows] = useState([defaultState].concat(defaultState).concat(defaultState));
   const [rowsAC, setRowsAC] = useState(ambientesComplementarios || []);
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
   const [coordenadas, setCoordenadas] = useState(data?.coordenadas || "");
   const [step, setStep] = useState(1);
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   // setMutate("hola")
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

   const MySelect = ({ label, ...props }) => {
      const [field, meta] = useField(props);
      return (
         <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
               <div style={styleError}>{meta.error}</div>
            ) : null}
         </div>
      );
   };

   const onSubmit = async (values) => {

      const dataComplete = {
         ...values,
         ubication: values.zone,
         level: `${aulaInicial ? "Inicial" : ""} ${aulaPrimaria ? "Primaria" : ""} ${aulaSecundaria ? "Secundaria" : ""}`,
         rows,
         aforoInicial, aulaInicial, aforoPrimaria, aulaPrimaria, aforoSecundaria, aulaSecundaria,
         ambientesComplementarios: rowsAC,
         sublevel: tipo,
         coordenadas: coordenadas,
         user_id: id
      };
      const data = await plataformAxios.post(`projects`, dataComplete);
      setMutate(data.data.proyectos.coordenadas);


      // console.log(data.data.proyectos)

      if (data.data.proyectos.parent_id == 0) {

         const dataHijo = await plataformAxios.post(`projects`, { ...dataComplete, parent_id: data.data.proyectos.id, name: "VERSION 1" });

         // console.log(dataHijo)
         if (!!dataHijo.data.proyectos) {
            setMutate(data.data.proyectos.coordenadas);

            setStep(2);
         }
      }

      if (data.data.proyectos.parent_id != 0) {
         console.log("hola")

         setStep(2);
      }

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
      <Card>
         {step === 1 &&
            <Container >
               <h2>Crear proyecto nuevo</h2>
               <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
               >
                  {({ errors, touched }) => (
                     <Form>
                        <Grid container spacing={5}>
                           <Grid item xs={12} sm={6} lg={12}>
                              <Grid container spacing={1} >
                                 <Grid item xs={12}>
                                    <span>NOMBRE:</span><br />
                                    <Field style={styleInput} type="text" name="name" placeholder={`${data?.name ? data.name : "Ingrese nombre del proyecto"}`} />
                                    {errors.name && touched.name ? (
                                       <div style={styleError}>{errors.name}</div>
                                    ) : null}
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                 </Grid>

                                 <Grid item xs={12}>
                                    <span>TIPOLOGIA:</span> <br />
                                    <Field style={styleInput} type="text" name="tipologia" />
                                    {errors.tipologia && touched.tipologia ? (
                                       <div style={styleError}>{errors.tipologia}</div>
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
                                    // componentsProps={{ backdrop: { style: { overflowY: "scroll" } } }}
                                    >
                                       <Fade in={open}>
                                          <Box sx={styleModal}>


                                             <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={6}>
                                                   <a href="/descargas/test.xlsx" download="Centros de Educaclientcion.xlsx">
                                                      <Button variant="contained" color="primary" onClick={() => downloadExcel()}>
                                                         Descargar Excel
                                                      </Button>
                                                   </a>
                                                </Grid>
                                                <Grid item xs={6}>
                                                   <Input style={{ ...styleInput, width: "auto", height: "80px", }} type='file' accept='.xlsx, .xls' onChange={(e) => onImportExcel(e)} sx={{ display: "none" }} id="button_file" />
                                                   <label htmlFor="button_file">
                                                      <Button variant="contained" component="span">
                                                         Upload
                                                      </Button>
                                                   </label>
                                                </Grid>
                                             </Grid>



                                          </Box>
                                       </Fade>
                                    </Modal>



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
                                       <Button variant='outlined' onClick={handleOnAdd}>Agregar</Button>
                                    </Grid>

                                    {false ? (
                                       <CircularProgress />
                                    ) : (
                                       <Grid item xs={12} marginTop="1rem">
                                          <Grid container spacing={1} sx={{ width: "100%" }}>
                                             <Grid item xs={6} >
                                                <span >AMBIENTES COMPLEMENTARIOS</span>
                                             </Grid>
                                             <Grid item xs={3}>
                                                <span>AFORO MAXIMO</span>
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
                                          </Grid>
                                       </Grid>
                                    )}
                                 </Grid>
                              </Grid>
                           </Grid>
                           {/* UBICACIÓN */}

                           {/* <Grid spacing={1} sx={{ marginBottom: "2rem" }} direction="column" xs={6}> */}
                           <Grid item xs={12} container spacing={1} justifyContent="end">
                              <Grid sx={{ marginBottom: "2rem" }} xs={6} item>
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

                                 <Grid item xs={12}>
                                    <span>RESPONSABLE:</span> <br />
                                    <Field style={styleInput} type="text" name="manager" />
                                    {errors.manager && touched.manager ? (
                                       <div style={styleError}>{errors.manager}</div>
                                    ) : null}
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                 </Grid>

                                 <Grid item xs={12}>
                                    <span>CLIENTE:</span> <br />
                                    <Field style={styleInput} type="text" name="client" />
                                    {errors.client && touched.client ? (
                                       <div style={styleError}>{errors.client}</div>
                                    ) : null}

                                    {/* <ErrorMessage name="email" component="div" /> */}
                                 </Grid>
                              </Grid>

                              {/* <Grid xs={6} item> */}
                              <Grid item xs={6}>
                                 <iframe className="iframe"
                                    src={`https://maps.google.com/?ll=${coordenadas}&z=16&t=m&output=embed`}
                                    height="100%" width="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen>
                                 </iframe>
                              </Grid>

                              <Grid item xs={6}>
                                 <span>Coordenadas:</span> <br />
                                 <Field style={styleInput} type="text" value={coordenadas} onChange={e => setCoordenadas(e.target.value)} name="coordenadas" />
                                 {errors.coordenadas && touched.coordenadas ? (
                                    <div style={styleError}>{errors.coordenadas}</div>
                                 ) : null}
                                 {/* <ErrorMessage name="email" component="div" /> */}
                              </Grid>
                              {/* </Grid> */}

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
                  <Button onClick={() => setStep(3)}>Continuar</Button>

               </Box>

               <img src="/images/cuadro1.jpg" alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }

         {step === 3 &&
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
               <Box  >
                  <Button onClick={() => setStep(4)}>Continuar 3</Button>

               </Box>

               <img src="/images/cuadro1.jpg" alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }

         {step === 4 &&
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
               <Box  >
                  <Button onClick={() => setStep(5)}>Continuar 4</Button>

               </Box>

               <img src="/images/cuadro1.jpg" alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }

         {step === 5 &&
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
               <Box  >
                  <Button onClick={() => setStep(6)}>Continuar 5</Button>

               </Box>

               <img src="/images/cuadro1.jpg" alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }

         {step === 6 &&
            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
               <Box  >
                  {/* <Link
                     component={RouterLink}
                     color="inherit"
                     to={"/"}
                     sx={{ mt: 2 }}> */}
                  <Button onClick={() => {
                     onClose()
                     // location.reload();
                  }
                  }>Continuar fin</Button>
                  {/* </Link> */}

               </Box>

               <img src="/images/cuadro1.jpg" alt="img" style={{ display: "flex", width: "70%", margin: "0 auto" }} />
            </Container>
         }
      </Card>
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