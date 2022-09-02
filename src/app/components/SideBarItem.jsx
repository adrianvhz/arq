import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";


export const SideBarItem = ({ title = '', id, page }) => {

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title
  })

  //const dispatch = useDispatch()

  const onSelectNote = () => {
    //dispatch(setActiveNote({title, body, date,id,imageUrls}))
    Router.push(`/note/${id}`)
  }

  return (
    // <Grid container direction="row" justifyContent="end">
    //   <Link
    //     component={RouterLink}
    //     color="inherit"
    //     to="/auth/register"
    //     sx={{ mt: 2 }}
    //   >
    //     Crear una cuenta
    //   </Link>
    // </Grid>

    <Link
      component={RouterLink}
      color="inherit"
      to={page}
      sx={{ mt: 2 }}>
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
    </Link>


  )
}
