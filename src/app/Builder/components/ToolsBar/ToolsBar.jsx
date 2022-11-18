import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from '@mui/material/styles/styled';
import PlayIcon from '@mui/icons-material/PlayCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSettings, setCameraControls, setRoof, setColorWall } from "../../../../redux/building/buildingSlice";
import "./styles.css";
import AreasList from "../../Plan3D/components/AreasList";
import Button3D from "./components/Button3D";
import Button2D from "./components/Button2D";

export default function ToolsBar() {
	const dispatch = useDispatch();
	console.log("ToolsBar");

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
				<ColorButton
					onClick={() => dispatch(setCameraControls({ cameraControls: "play" }))}
				>
					<PlayIcon htmlColor="#3699FF" />&nbsp; Play
				</ColorButton>

				<Button2D />

				<Button3D />

				<ColorButton disabled>
					<DeleteIcon htmlColor="#3699FF" />&nbsp; Eliminar
				</ColorButton>

				<ColorButton disabled>
					<CopyIcon htmlColor="#3699FF" />&nbsp; Copiar
				</ColorButton>

				<ColorButton
					onClick={() => dispatch(setShowSettings({ showSettings: true }))}
				>
					<SettingsIcon htmlColor="#3699FF" />&nbsp; Ajustes
				</ColorButton>

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

		</header>
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
    '&:hover': {
        backgroundColor: "#d8dbe8",
        boxShadow: "none"
    }
})
