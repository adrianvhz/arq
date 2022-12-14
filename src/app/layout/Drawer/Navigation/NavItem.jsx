import { Link as RouterLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function NavItem({ open, Icon, name, selected, to }) {
	return (
		<ListItem disablePadding>
			<RouterLink to={to} style={{ display: "block", width: "100%" }}>
				<ListItemButton
					selected={selected}
					sx={{
						minHeight: 48,
						// justifyContent: open ? "initial" : "center",
						px: 2.5
					}}
				>
						<div style={{ display: "flex" }}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								<Icon />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={name}
								sx={{
									opacity: open ? 1 : 0,
									color: selected ? "#fff" : "#9899ac"
								}}
							/>
						</div>
				</ListItemButton>
					</RouterLink>
		</ListItem>
	)
}
