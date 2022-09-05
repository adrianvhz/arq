import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppsIcon from '@mui/icons-material/AppsRounded';
import Button from '@mui/material/Button'; // @ts-ignore
import banner from '../../assets/images/Pro-design-banner-01.jpg';
import styled from '@mui/material/styles/styled';
import { AuthView } from '../views';

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid container direction='row' bgcolor='#fff' sx={{ minHeight: '100vh' }}>
      <Grid
        item
        className='box-shadow'
        sx={{ boxShadow: 'none' }}
        xs={0}
        md={6}
        lg={8}
        // xl={9}
      >
        <div
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'round',
            width: '100%',
            minHeight: '100%',
          }}>
          <div style={{ marginLeft: '2rem', marginTop: '2rem', position: 'absolute' }}>
            <div style={{ display: 'inline-flex' }}>
              <ColorButton variant='contained'>
                <AppsIcon sx={{ color: '#00B050', fontSize: '3rem', fontWeight: 'bold' }} />
              </ColorButton>
            </div>
          </div>
        </div>
      </Grid>

      <Grid
        item
        // direction="row"
        justifyContent='center'
        sx={{
          minHeight: '100vh',
        }}
        xs={12}
        md={6}
        lg={4}
        // xl={3}
      >
        <Grid item xs={12} bgcolor='#05245C' height={180}></Grid>

        <Grid
          item
          xs={6}
          sx={{
            margin: 'auto',
            marginTop: '-60px',
            marginBottom: '15px',
            bgcolor: '#fff',
            padding: '20px',
            height: '100px',
            minWidth: '300px',
            textAlign: 'center',
            boxShadow: '0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%)',
          }}
          className='box-shadow'>
          <h4>
            <b>PRO DESIGN</b>
            <br />
            <span>Plataforma de Arquitectura</span>
          </h4>
        </Grid>

        <Grid item xs={12} padding='2.75rem 5rem'>
          {/* <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography> */}
          {/* {children} */}

          <AuthView />

          <div style={{ padding: '1.75rem', marginBottom: '1.75rem', textAlign: 'center' }}>
            <p>
              Al crear tu cuenta aceptas nuestros&nbsp;
              <a href='#'>Términos y Condiciones</a>
              &nbsp;y&nbsp;
              <a href='#'>Política de Tratamiento de Datos</a>.
            </p>
          </div>
        </Grid>

        <Grid sx={{ textAlign: 'center' }}>
          <div style={{ padding: '1.75rem 2rem', textAlign: 'center' }}>
            <p style={{ marginTop: '0', marginBottom: '1rem' }}>
              Diseño Web:&nbsp;
              <a href='#'>Creative Marketing Ideas S.A.C.</a>
              <br />
              Programación Web:&nbsp;
              <a href='#'>Sotdynamic S.A.C</a>
            </p>
          </div>
        </Grid>
      </Grid>
    </Grid>
    //  <Grid
    //    container
    //    spacing={0}
    //    direction="column"
    //    alignItems="center"
    //    justifyContent="center"
    //    sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    //  >
    //    <Grid
    //      item
    //      className="box-shadow"
    //      xs={3}
    //      sx={{
    //          width: {sm:450 },
    //          backgroundColor: "white",
    //          padding: 3,
    //          borderRadius: 2 }}
    //    >
    //      <Typography variant="h5" sx={{ mb: 1 }}>
    //        {title}
    //      </Typography>
    //      {/* {children} */}

    // 	  <AuthView />

    //    </Grid>
    //  </Grid>
  );
};

const ColorButton = styled(Button)({
  padding: '.6rem 0',
  backgroundColor: '#fff',
  boxShadow: '0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%)',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#fff',
  },
});
