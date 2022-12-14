import { Link as RouterLink, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import FolderIcon from "@mui/icons-material/Folder";
import MonitorIcon from "@mui/icons-material/Monitor";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import useTheme from "@mui/material/styles/useTheme";
import List from "@mui/material/List";
import NavItem from "./Navigation/NavItem";
import Diseños from "./Navigation/Diseños";


const drawerWidth = 265;

export default function DrawerComponent({ open, handleDrawerToggle }) {
	const theme = useTheme();
	const location = useLocation();

	return (
		<Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
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
						<RouterLink to={"/"}>
							<h4 style={{ color: "#fff", margin: "0" }}>ProDesign</h4>
						</RouterLink>
					) : (
						// <IconButton onClick={handleDrawerToggle}>
						// 	<KeyboardDoubleArrowRight
						// 		sx={{ height: "2.5rem", width: "2.5rem", color: "#3F4254" }}
						// 	/>
						// </IconButton>
						null
					)}
					{/* <IconButton onClick={handleDrawerToggle}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon fontSize="7rem" />
						) : (
							<KeyboardDoubleArrowLeft
								sx={{ height: "2.5rem", width: "2.5rem", color: "#3F4254" }}
							/>
						)}
					</IconButton> */}
				</DrawerHeader>

				<List>
					{/* Item: Inicio */}
					<NavItem
						name="Inicio"
						open={open}
						Icon={EqualizerIcon}
						selected={location.pathname === "/"}
						to="/"
					/>

					{/* Item: Diseños */}
					<Diseños
						name="Mis Diseños"
						isSidebarOpen={open}
						Icon={FolderIcon}
						selected={location.pathname.startsWith("/proyecto")}
						location={location}
					/>
					
					{/* Item: Sistema */}
					<NavItem
						name="Sistema"
						open={open}
						Icon={MonitorIcon}
						selected={location.pathname === "/sistema"}
						to="/sistema"
					/>
				</List>
			</Drawer>
		</Box>
	)
}


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
  