// import Toolbar from "@mui/material/Toolbar";
// import Box from "@mui/system/Box";
// import { SideBar, NavBar } from "../components";

// const drawerWidth = 150;
// export const ArqPlataformLayout = ({ children }) => {
//   return (
//     <Box sx={{ display: "flex" }}  >
//       {/*Navbar */}
//       < NavBar drawerWidth={drawerWidth} />
//       {/* Sidebar */}
//       <SideBar drawerWidth={drawerWidth} />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#F1F1F1" }}>
//         {/* Toolbar */}
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   );
// };

import { useState } from "react";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Footer, UserPopover } from "../components";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FolderIcon from "@mui/icons-material/Folder";
import MonitorIcon from "@mui/icons-material/Monitor";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../redux/main/mainSlice";
import Typography from "@mui/material/Typography";

const drawerWidth = 265;

export const ArqPlataformLayout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const view = useSelector((state) => state.main.view);
  const dispatch = useDispatch();
  // console.log(open)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#EEF0F8" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
          WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div></div>
            <UserPopover />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ style: { backgroundColor: "#05245c" } }}
      >
        <DrawerHeader
          sx={{
            margin: "0 1.3rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {open ? (
            <Link to={"/"}>
              <h4 style={{ color: "#fff", margin: "0" }}>ProDesign</h4>
            </Link>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <KeyboardDoubleArrowRight
                sx={{ height: "2.5rem", width: "2.5rem", color: "#3F4254" }}
              />
            </IconButton>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon fontSize="7rem" />
            ) : (
              <KeyboardDoubleArrowLeft
                sx={{ height: "2.5rem", width: "2.5rem", color: "#3F4254" }}
              />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block", backgroundColor: "#1b1b28" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                dispatch(setView({ view: "home" }));
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: { color: "#fff" } }}
                primary={"Inicio"}
                sx={{ opacity: open ? 1 : 0 }}
              />
              {/* <ChevronRightIcon sx={{color: "#fff", fontSize: "1.3rem"}} /> */}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                dispatch(setView({ view: "projects" }));
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Mis Diseños"}
                sx={{ opacity: open ? 1 : 0 }}
              />
              <ChevronRightIcon sx={{ color: "#5c5e81", fontSize: "1.3rem" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                console.log(view);
                dispatch(setView({ view: "menu" }));
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MonitorIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Sistema"}
                sx={{ opacity: open ? 1 : 0 }}
              />
              <ChevronRightIcon sx={{ color: "#5c5e81", fontSize: "1.3rem" }} />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Divider /> */}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}

        <div
          style={{
            position: "fixed",
            width: "100%",
            bottom: "0",
            left: "0",
            backgroundColor: "#ffff",
            padding: "1rem 0",
          }}
        >
          s
        </div>
        <Footer />
      </Box>
    </Box>
  );
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  //   zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
