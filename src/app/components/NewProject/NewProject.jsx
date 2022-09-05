import React, { useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewProjectForm from './NewProjectForm';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '950px',
    bgcolor: 'background.paper',
    height: '700px',
    overflowY: "scroll",
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    // responsive
    '@media (max-width: 1024px)': {
        width: '85%',
        height: '100%',
        // top: '25%',
        left: '50%',
        // transform: 'translate(0, 0)',
        // borderRadius: '0',
    }


};

const ColorButton = styled(Button)({
    borderRadius: ".42rem",
    color: "#ffffff",
    padding: ".60rem 1rem",
    fontFamily: "inherit",
    textTransform: "none",
    border: "1px solid #1BC5BD",
    boxShadow: "none",
    backgroundColor: "#1BC5BD",
    '&:hover': {
        backgroundColor: "#2cb4ad",
        boxShadow: "none"
    }
})

const NewProject = ({ onRow, data }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {onRow ? <AddIcon onClick={handleOpen} sx={{ cursor: "pointer" }} /> : <Button variant="contained" color="primary" onClick={handleOpen}> + Nuevo </Button>}
            {/* <Button variant="contained" onClick={handleOpen}>+ Nuevo</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <NewProjectForm data={data} onClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default NewProject