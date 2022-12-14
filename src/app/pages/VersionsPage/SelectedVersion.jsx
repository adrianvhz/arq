import { useEffect } from "react";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import View3D from "./BuildViews/View3D";

export default function SelectedVersion({ selectedVersion }) {
	useEffect(() => {
		
	}, [selectedVersion])

	return (
		<Grid container px="2rem" spacing={1}>
			<Grid item xs={12}>
				<StyledPaper sx={{ backgroundColor: "#dfdfdf", color: "black" }}>
					<Typography>{selectedVersion.name}</Typography>
				</StyledPaper>
			</Grid>
			<Grid item xs={12} md={12} lg={6}>
				{/* <img
					width="100%"
					src="https://s.tmimgcdn.com/scr/1200x750/142900/low-poly-chair-table-plant-window-bookshelf-in-a-classroom-3d-model_142977-original.png"
				/> */}
				<div style={{ height: "100%", minHeight: "350px", backgroundColor: "green" }}>
					{/* <View3D selectedVersion={selectedVersion} /> */}
				</div>
			</Grid>
			<Grid item xs={12} md={12} lg={6}>
				<img
					width="100%"
					src="https://s.tmimgcdn.com/scr/1200x750/142900/low-poly-chair-table-plant-window-bookshelf-in-a-classroom-3d-model_142977-original.png"
				/>
				{/* <div style={{ height: "100%", minHeight: "350px" }}>
					
				</div> */}
			</Grid>
		</Grid>
	)
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
	// padding: "1rem",
    textAlign: 'center',
	color: "white",
	padding: "6px 0",
    // color: theme.palette.text.secondary,
    // height: 60,
    // lineHeight: '60px',
    backgroundColor: "#adadad"
}));