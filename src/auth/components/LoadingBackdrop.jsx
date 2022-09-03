import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function LoadingBackdrop() {
	// const [open, setOpen] = useState(false);
	// const handleClose = () => {
	//   setOpen(false);
	// };
	// const handleToggle = () => {
	//   setOpen(!open);
	// };
	const isLoading = useSelector((state) => state.auth.status) === "checking";
	
	return (
		<div>
			{/* <Button onClick={handleToggle}>Show backdrop</Button> */}
			<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isLoading}
			// onClick={handleClose}
			>
				<CircularProgress color="primary" />
			</Backdrop>
		</div>
	);
}