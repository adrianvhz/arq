import { useState, forwardRef } from "react";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from "@mui/material/Button";

import Chip from '@mui/material/Chip';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TableSelect from "./TableSelect";
import "./a.css";

// sweet alert
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: false,
	didOpen: (toast) => {
	  toast.addEventListener('mouseenter', Swal.stopTimer)
	  toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableCosts({ handleCosts }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const data = Object.fromEntries(new FormData(evt.target));
		console.log(data);
		handleCosts(data);
		handleClose();
		Toast.fire({
			icon: 'success',
			title: 'Tablero actualizado correctamente!'
		})
	}

	return (
		<div>
			<Chip icon={<PriceChangeIcon />} label="Tablero" color="primary" variant="outlined" onClick={handleClickOpen} />
			<Dialog
				open={open}
				TransitionComponent={Transition}
				maxWidth="md"
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle textAlign="center">{"Tabla de Costos"}</DialogTitle>
					<DialogContent>
						{/* <DialogContentText id="alert-dialog-slide-description">
							Let Google help apps determine location.
						</DialogContentText> */}
							<TableSelect />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button type="submit">Aceptar</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}
