import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { setAuthModal } from "../../redux/auth/authSlice";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	display: "flex",
	flexDirection: "column",
	// justifyContent: "center",
	alignItems: "center",
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	borderRadius: ".42rem",
	boxShadow: 24,
	p: "2rem",
 };

export default function AuthModal() {
	// const dispatch = useDispatch();
	// const handleClose = () => dispatch(setAuthModal({ authModal: false }));
	const open = useSelector((state) => state.auth.authModal);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				// onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					{/* <Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Error
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							Datos incorrectos
						</Typography>
						<Button variant="contained" size="large" sx={{my: "1rem", backgroundColor: "#2778c4", fontWeight: "500"}} onClick={handleClose}>
							OK
						</Button>
					</Box> */}
					<Box sx={style}>
      				<CircularProgress color="info" />
    				</Box>
				</Fade>
			</Modal>
		</div>
	);
}