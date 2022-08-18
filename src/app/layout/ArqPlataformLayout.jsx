import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { SideBar, NavBar } from "../components";

const drawerWidth = 150;
export const ArqPlataformLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}  >
      {/*Navbar */}
      < NavBar drawerWidth={drawerWidth} />
      {/* Sidebar */}
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
