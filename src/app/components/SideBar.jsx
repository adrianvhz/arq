import { TurnedInNot } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Toolbar,
  Typography,
  Divider,
  List
} from "@mui/material";
import ModalTests from "../views/Modal";
import PlantillasMaestra from "../views/PlantillasMaestra";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  const notes = [
    { id: "1", title: "Home", page: "/home" },
    // { id: "2", title: "titulo 2" },

    // { id: "1", title: "Crear Proyecto", component: "PlantillasMaestra" },
  ];

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
      bgcolor="blue"
      color="white"
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}

      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Design
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
          {/* <PlantillasMaestra /> */}
        </List>
      </Drawer>
    </Box>
  );
};
