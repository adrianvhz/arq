import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import styled from "@mui/material/styles/styled";
import Search from "./HeaderContent/Search";
import { UserPopover } from "../../components";

// import { drawerWidth } from 'config';
const drawerWidthClosed = 65.5;
const drawerWidth = 265; // 260

export default function Header({ open, handleDrawerToggle }) {
	return (
		<AppBar // Appbar === Header
			open={open}
			position="fixed"
			color="inherit"
			sx={{
				boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
				WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)"
				// backgroundColor: "#ffffff"
			}}
		>
			<Toolbar>
				<IconButton sx={{ backgroundColor: "#f5f5f5", borderRadius: "4px" }} onClick={handleDrawerToggle}>
					<MenuOpenOutlinedIcon />
				</IconButton>
				<Search />
				<UserPopover />
			</Toolbar>
		</AppBar>
	)
}


// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open ?
		{
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
    	}
		:
		{
			marginLeft: drawerWidthClosed,
			width: `calc(100% - ${drawerWidthClosed}px)`
		}
	),
}));
