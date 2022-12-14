import { Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
import styled from "@mui/material/styles/styled";

export default function NavItemProject({ id, name, selected, open, handleProjectOpen }) {
	const [projectID, page] = selected;
	
	return (
		<>
			<ListItemButton
				onClick={handleProjectOpen(id)}
				// onClick={handleClickOpen}
			>
				{/* &#9632; */}
				<ListItemText
					disableTypography
					primary={name}
					sx={{ color: Number(projectID) === id ? "white" : "#9899ac" }}
				/>
				<ChevronRightIcon sx={{ color: "#5c5e81", fontSize: "1.3rem" }} />
			</ListItemButton>	

			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
			>
				<List disablePadding>
					<RouterLink to={`/proyecto/colegios/${id}/versions`}>
						<ListItemButton>
							{/* <ListItemIcon sx={{
								minWidth: 0,
								mr: 2,
								color: Number(projectID) === id && page === "versions" ? "#85bb65" : "#9899ac"
							}}>
								<PaymentsOutlinedIcon />
							</ListItemIcon> */}
							<ListItemText
								disableTypography
								sx={{
									color: Number(projectID) === id && page === "versions" ? "#ffff" : "#b9b9c6"
								}}
							>
								&#9632; Versiones
							</ListItemText>
						</ListItemButton>
					</RouterLink>
					
					<RouterLink to={`/proyecto/colegios/${id}/costs`}>
						<ListItemButton>
							{/* <ListItemIcon sx={{
								minWidth: 0,
								mr: 2,
								color: Number(projectID) === id && page === "costs" ? "#1890ff" : "#9899ac"
							}}>
								<FilterFramesOutlinedIcon />
							</ListItemIcon> */}
							<ListItemText
								disableTypography
								sx={{
									color: Number(projectID) === id && page === "costs" ? "#ffff" : "#b9b9c6" 
								}}
							>
								&#9632; Costos
							</ListItemText>
						</ListItemButton>
					</RouterLink>
				</List>
			</Collapse>
		</>
	)
}

const ListItemButton = styled(MuiListItemButton)({
	minHeight: 48,
	textAlign: "center"
});
