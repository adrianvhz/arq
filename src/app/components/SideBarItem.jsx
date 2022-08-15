
import {  ListItem, ListItemIcon, ListItemButton, Grid, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';


export const SideBarItem = ({title='',id}) => {

  const newTitle = useMemo(()=>{
    return title.length>17 ? title.substring(0,17) + '...' : title
  })

  //const dispatch = useDispatch()

  const onSelectNote = () => {
    //dispatch(setActiveNote({title, body, date,id,imageUrls}))
  }
  
  return (
    
            <ListItem key={id} disablePadding >
            <ListItemButton onClick={onSelectNote}>
                <ListItemIcon>
                <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                <ListItemText primary={newTitle} />

                </Grid>
            </ListItemButton>
            </ListItem>

  )
}
