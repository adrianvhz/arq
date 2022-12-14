import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Footer } from "../components";
import Header from "./Header/Header";
import Drawer from "./Drawer";

export const AppLayout = ({ children }) => {
	const [open, setOpen] = useState(true);
	
	const handleDrawerToggle = () => {
		setOpen(!open);
	}
	
	return (
		<Box sx={{ display: "flex", width: "100%", backgroundColor: "unset" }}>
			<Header open={open} handleDrawerToggle={handleDrawerToggle} />
			<Drawer
				open={open}
				handleDrawerToggle={handleDrawerToggle}
			/>								{/* p: { xs: 2, sm: 3 } */}
			<Box component="main" sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}>
				<Toolbar />
				{children}
			</Box>
			<Footer open={open} />
		</Box>
	)
}
