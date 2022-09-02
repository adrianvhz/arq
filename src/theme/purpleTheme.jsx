import { createTheme } from "@mui/material";
import red from '@mui/material/colors/red'


export const purpleTheme = createTheme({
	typography: {
		fontFamily: [
			"'Poppins'",
			"sans-serif"
		].join(",")
	},
	shadows: { "0": "none" },
	components: {
		MuiListItemText: {
			styleOverrides: {
				primary: {
					fontFamily: ", ",
					color: "#9899ac"
				}
			}
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: "#B5B5C3"
				}
			}
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: "#1b1b28"
					}
				}
			},
			variants: [
				{
					props: { variant: "selected" },
					style: {
						backgroundColor: "#1b1b28"
					}
				}
			]
		}
	},
	palette:{
		primary:{
			main: '#3f50b5'
		},
		secondary:{
			main : '#543884'
		},
		error:{
			main: red.A400
		}
	}
})
