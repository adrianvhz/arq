import styled from "@mui/material/styles/styled";
import MuiBox from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const drawerWidthClosed = 65.5;
const drawerWidth = 265; // 260

export const Footer = ({ open }) => {
	// const dispatch = useDispatch();

	// const onLogout = () => {
	// 	dispatch(startLogoutAuth());
	// }
	
	return (
		<Box
			open={open}
			component="footer"
			position="fixed"

			// borrar estos y las estrellas
			display="flex"
			justifyContent="space-between"
		>
			<div>
				<span style={{ marginRight: "1rem", color: "#B5B5C3", fontWeight: "500"}}>2022©</span>
				<a href="/">ProDesign</a>
			</div>

			<Stack spacing={1}>
				<Rating name="half-rating" sx={{ '& .MuiRating-iconFilled': { color: "#faaf00" } }} defaultValue={4.5} precision={0.5} />
			</Stack>
		</Box>
	)
}


const Box = styled(MuiBox, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	bottom: "0",
	padding: "1rem 2rem",
	backgroundColor: "#fff",
	color: "white",

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open ?
		{
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
    	}
		:
		{
			marginLeft: drawerWidthClosed,
			width: `calc(100% - ${drawerWidthClosed}px)`
		}
	)
}));