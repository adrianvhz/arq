import { useState } from "react";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavItemProject from "./NavItemProject";
import styled from "@mui/material/styles/styled";
// icons
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TestIcon from '@mui/icons-material/TextSnippet';

import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

export default function NavItemAccordion({ isSidebarOpen, name, Icon, selected, location, type_project_id = 1 }) {
	const [open, setOpen] = useState(false);
	const [tab, setTab] = useState(0); // tabs (type projects)
	const [projectOpen, setProjectOpen] = useState(null);
	
	const projects = useSelector(state => state.project.projects);

	const handleChange = (event, newValue) => {
		setTab(newValue);
	}

	const handleToggleOpen = () => {
		setOpen(!open);
	}
	
	const handleProjectOpen = (project) => () => {
		setProjectOpen(actualProject => {
			if (actualProject === project) return null;
			else return project;
		});
	}

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					selected={selected}
					sx={{
						minHeight: 48,
						justifyContent: isSidebarOpen ? "initial" : "center",
						pl: 2.5
						
					}}
					onClick={handleToggleOpen}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: isSidebarOpen ? 3 : "auto",
							justifyContent: "center"
						}}
					>
						<Icon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						primary={name}
						sx={{
							opacity: isSidebarOpen ? 1 : 0,
							color: selected ? "#fff" : "#9899ac"
						}}
					/>
					<ChevronRightIcon sx={{ color: "#5c5e81", fontSize: "1.3rem" }} />
				</ListItemButton>
			</ListItem>

			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
			>
				{/* select type project */}
				<ListItem
					disablePadding
					sx={{ justifyContent: "center" }}
				>
					<Tabs
						value={tab}
						onChange={handleChange}
						aria-label="icon tabs"
						textColor="primary"
					>
						<Tab icon={<SchoolOutlinedIcon />} aria-label="school" />
						<Tab icon={<TestIcon />} aria-label="test" />
					</Tabs>
				</ListItem>

				{/* projects list */}
				<List disablePadding>
					{projects.filter(project => project.parent_id === 0).map(project => (
						<NavItemProject
							key={project.id}
							id={project.id}
							name={project.name}
							selected={location.pathname.split("/").slice(3, 5)}
							open={projectOpen === project.id}
							handleProjectOpen={handleProjectOpen}
						/>
					))}
				</List>
			</Collapse>
		</>
	)
}

const Tab = styled(MuiTab)({
	color: "#bebebf"
})