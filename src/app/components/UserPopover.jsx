import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@mui/material/styles/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/auth/authSlice";

export function UserPopover() {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const name = useSelector((state) => state.auth.name);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	console.log(name)
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<ButtonPopever aria-describedby={id} variant="contained" onClick={handleClick} >
				<span style={{color: "#B5B5C3", fontWeight: "500", marginRight: "0.25rem"}}>Hola,</span>
				<span style={{color: "#7E8299", fontWeight: "600", marginRight: "0.75rem"}}>{name}</span>
				<div style={{backgroundColor: "#dee9fd", borderRadius: "6px", width: "35px", height: "35px"}} >
					<PersonIcon sx={{color: "#3699FF", fontSize: "2.4rem"}} />
				</div>
			</ButtonPopever>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: "left"
				}}
				PaperProps={{
					sx: {boxShadow: "0px 0px 50px 0px rgb(82 63 105 / 15%)"}
				}}
			>
				<Box
					sx={{
						display: "flex",
						"& > *": {
							// m: 1
						}
					}}
				>
					<ButtonGroup orientation="vertical" variant="container" color="secondary" sx={{width: "138px"}} fullWidth>
						<Option>
							<PersonOutlineOutlinedIcon />
							<span>Mi Perfil</span>
						</Option>
						<Option
							onClick={() => dispatch(logout())}
						>
							<LogoutIcon />
							<span>Salir</span>
						</Option>
					</ButtonGroup>
				</Box>
				{/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
			</Popover>
		</div>
	);
}




const ButtonPopever = styled(Button)({
	borderRadius: ".42rem",
	fontSize: "1rem",
	lineHeight: "0",
	color: "#ffffff",
	padding: ".6rem .5rem",
	fontFamily: "inherit",
	textTransform: "none",
	// boxShadow: "none",
	backgroundColor: "#ffff",
	"&:hover": {
		backgroundColor: "#F3F6F9",
		boxShadow: "none"
	}
})

const Option = styled(Button)({
	fontSize: "1rem",
	padding: ".75rem 1.5rem",
	textTransform: "none",
	fontWeight: "unset",
	"&:hover": {
		backgroundColor: "#F3F6F9",
	},
	"&:hover > span": {
		color: "#3595f6"
	},
	"& > span, svg": {
		color: "#7E8299",
		marginRight: ".4rem"
	}
})
