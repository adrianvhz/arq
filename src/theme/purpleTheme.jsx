import createTheme from "@mui/material/styles/createTheme";
import red from "@mui/material/colors/red";


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
			},
			variants: [
				{
					props: { variant: "project-item" },
					style: {
						"&:hover": {
							backgroundColor: "red"
						}
					}
				}
			]
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: "#B5B5C3"
				}
			}
		},
		// MuiListItem: {
		// 	styleOverrides: {
		// 		root: {
		// 			"&:hover": {
		// 				// backgroundColor: "#232334" // #1b1b28
		// 			}
		// 		}
		// 	}
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#1b1b28",
						"&:hover": {
							backgroundColor: "#1b1b28"
						}
					},
					"&:hover": {
						backgroundColor: "#232334"
					}
				}
			},
			// variants: [
			// 	{
			// 		props: { selected: true },
			// 		style: {
			// 			backgroundColor: "#1b1b28"
			// 		}
			// 	}
			// ]
		}
	},
	palette:{
		primary:{
			main: '#1890ff'
		},
		secondary:{
			main : '#543884'
		},
		error:{
			main: red.A400
		}
	}
})
