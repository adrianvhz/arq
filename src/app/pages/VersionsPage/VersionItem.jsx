import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';

export default function VersionItem({ version, handleSelectedVersion }) {
	return (
		<Grid item md={12}>
			<Grid container flexDirection="column" spacing={0.5} sx={{ "&:hover": { cursor: "pointer" } }}>
				<Grid item>
					<StyledPaper>{version.name}</StyledPaper>
				</Grid>
				<Grid item onClick={() => handleSelectedVersion(version)}>
					<img
						width="100%"
						src="https://s.tmimgcdn.com/scr/1200x750/142900/low-poly-chair-table-plant-window-bookshelf-in-a-classroom-3d-model_142977-original.png"
					/>
				</Grid>
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

// const StyledPaper = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     maxWidth: 400,
//     color: theme.palette.text.primary,
//   }));
