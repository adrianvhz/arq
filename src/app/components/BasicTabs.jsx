import {Tabs,Tab,Box }  from '@mui/material';

import { TabPanel } from './TabPanel';
import { useState } from 'react';
import { a11yProps } from '../../hooks/propsTabPanel';
import { DatosComponent } from './DatosComponent/DatosComponent';
import { React } from 'react';


export const BasicTabs = ({children, titulo=[]}) => {
  console.log(titulo)
   const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
    return (
    <Box sx={{ width: '100%', backgroundColor: "#FFF", padding:'20px', borderRadius:3,boxShadow:' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'  }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {children.map((child,i) =>
            <Tab label={titulo[i]} key={i} {...a11yProps(i)} />
          )
          }
        </Tabs>
       
      </Box>   
      {children.map((child,i) =>
        <TabPanel value={value} index={i} key={i}>
              {child}
         </TabPanel>
        )
      }
      

    </Box>
    );
}


