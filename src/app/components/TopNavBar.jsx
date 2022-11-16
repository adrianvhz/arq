import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { UserPopover } from "../components";

const drawerWidth = 265;

export default function TopNavBar({ children, open, handleDrawerOpen }) {
	return (
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
				{/* <IconButton
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
				</IconButton> */}
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
				{children}
				<div></div>
				<UserPopover />
				</div>
			</Toolbar>
		</AppBar>
	)
}

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