import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from '@mui/material/styles/styled';
import PlayIcon from '@mui/icons-material/PlayCircle';
import MapIcon from '@mui/icons-material/Map';
import View3dIcon from '@mui/icons-material/ViewInAr';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSettings, setView, setCameraControls, setRoof, setColorWall } from "../../../../redux/building/buildingSlice";
import "./styles.css";
import AreasList from "../../Plan3D/components/AreasList";

export default function ToolsBar() {
	const dispatch = useDispatch();
	console.log("ToolsBar")
	////
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
  	const id = open ? 'simple-popover' : undefined;
	////

	///////////////////////
	function debounce(func, timeout = 300){
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}
	
	function baseFn(value) {
		dispatch(setColorWall({ color: value }));
	}
	
	const handleColorWall = debounce((value) => baseFn(value));
	///////////////////////

	return (
		<header className="header">
			<Link
				to={"/"}
				className="toolbar-logo"
			>
				ProDesign
			</Link>
			<select style={{backgroundColor: "#E4E6EF", margin: "0 2.4rem"}}>
				<option>VERSION 1: HOME</option>
				<option>ESTRUCTURA</option>
			</select>
			<nav className="navMenu">
				<ColorButton onClick={() => dispatch(setCameraControls({ cameraControls: "play" }))}><PlayIcon htmlColor="#3699FF" />&nbsp; Play</ColorButton>
				<ColorButton onClick={handleClick}><MapIcon htmlColor="#3699FF" />&nbsp; Plano</ColorButton>
				<ColorButton onClick={() => dispatch(setView({ view: "3D" }))}><View3dIcon htmlColor="#3699FF" />&nbsp; 3D</ColorButton>
				<ColorButton disabled><DeleteIcon htmlColor="#3699FF" />&nbsp; Eliminar</ColorButton>
				<ColorButton disabled><CopyIcon htmlColor="#3699FF" />&nbsp; Copiar</ColorButton>
				<ColorButton onClick={() => dispatch(setShowSettings({ showSettings: true }))}><SettingsIcon htmlColor="#3699FF" />&nbsp; Ajustes</ColorButton>
				<ColorButton disabled>REPORTE</ColorButton>
				<ColorButton onClick={() => dispatch(setRoof())}>roof (temp)</ColorButton>
				<div style={{position: "absolute", top: "13px", right: "20rem"}}>
						<input id="color" type="color" name="color_wall" onChange={(evt) => {
							handleColorWall(evt.target.value);
						}} />
						<label htmlFor="color" style={{font: ".7rem 'Fira Sans', sans-serif", color: "black"}}>(prototype)</label>
				</div>
			</nav>
			{/* <AreasList /> */}

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{margin: "1.48rem 0"}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				PaperProps={{sx: {backgroundColor: "initial"}}}
			>
				<Grid container spacing={.4} direction="column" onClick={() => {
					dispatch(setView({ view: "2D" }));
					handleClose();
				}}>
					<Grid item xs={8} className="cursor">
						<div style={{padding: ".5rem 8rem .5rem .5rem"}}>
							NIVEL 1
						</div>
					</Grid>
					<Grid item xs={8} className="cursor">
						<div>
							NIVEL 2
						</div>
					</Grid>
					<Grid item xs={8} className="cursor">
						<div>
							AMBIENTES
						</div>
					</Grid>

					{/* AMBIENTES */}
				{/* <Grid> */}
					<Grid item xs={8} className="cursor">
						<div>
							MÓDULO AULA
						</div>
					</Grid>
					
					<Grid item xs={8} className="cursor">
						<div>
							CAFETERÍA
						</div>
					</Grid>

					<Grid item xs={8} className="cursor">
						<div>
							BIBLIOTECA
						</div>
					</Grid>

					<Grid item xs={8} className="cursor">
						<div>
							AUDITÓRIO
						</div>
					</Grid>
				{/* </Grid> */}
				</Grid>
			</Popover>

		</header>
	)
}
// redonde hacia abajo, largo 2x       60 metros de maximo para encontrar escalera.
// primero se construye la de arriba 
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
    '&:hover': {
        backgroundColor: "#d8dbe8",
        boxShadow: "none"
    }
})
