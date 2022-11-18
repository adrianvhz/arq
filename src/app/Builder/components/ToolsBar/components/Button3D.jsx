import { useState } from "react";
import { useDispatch } from "react-redux";
import { setView, setView3DModule } from "../../../../../redux/building/buildingSlice";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import View3dIcon from "@mui/icons-material/ViewInAr";
import styled from "@mui/material/styles/styled";

export default function Button3D() {
	const [anchorEl, setAnchorEl] = useState(null);
	
	let dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}
	
	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleViewModule = (module) => () => {
		dispatch(setView3DModule({ view3DModule: module }));
		handleClose();
	}

	const open = Boolean(anchorEl);
  	const id = open ? "simple-popover" : undefined;

	return (
		<>
			<ColorButton
				// onClick={() => dispatch(setView({ view: "3D" }))}
				onClick={handleClick}
			>
				<View3dIcon htmlColor="#3699FF" />&nbsp; 3D
			</ColorButton>
			
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{margin: "1.48rem 0"}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				PaperProps={{sx: {backgroundColor: "initial"}}}
			>
				<Grid container spacing={.4} style={{ width: "240px" }}>
					<Grid item xs={8} className="cursor" onClick={handleViewModule(1)}>
						<div style={{padding: ".5rem 1rem"}} className="module">
							NIVEL 1
						</div>
					</Grid>
					<Grid item xs={8} className="cursor" onClick={handleViewModule(2)}>
						<div className="module">
							NIVEL 2
						</div>
					</Grid>
					<Grid item xs={8} className="cursor disabled" onClick={handleViewModule(3)}>
						<div className="module">
							NIVEL 3
						</div>
					</Grid>
				</Grid>
			</Popover>
		</>
	)
}

const ColorButton = styled(Button)({
    borderRadius: ".42rem",
    color: "#3F4254",
    padding: ".60rem 1rem",
    fontFamily: "inherit",
    textTransform: "none",
    border: "1px solid #E4E6EF",
	margin: "0 .4rem",
    boxShadow: "none",
    backgroundColor: "#E4E6EF",
    "&:hover": {
        backgroundColor: "#d8dbe8",
        boxShadow: "none"
    }
})