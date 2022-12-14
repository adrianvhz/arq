import { useLocation, useParams } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import ToolsBarComponent from "./components/ToolsBar/ToolsBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from "./components/Settings/Settings";
import Plan3D from "./Plan3D/Plan3D";
import { UserPopover } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import { getProjectByID } from "../../services/projectsService";

export default function PlanIndex() {
	// const { state } = useLocation();

	const [state, setState] = useState(null);
	const params = useParams();

	useEffect(() => {
		getProjectByID(params.id)
			.then(
				(res) => setState(res.data.project),
				(err) => console.log(err)
			);
	}, [])

	if (!state) {
		return (
			<>
				<AppBar
					position="fixed"
					sx={{
						backgroundColor: "#ffffff",
						boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
						WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
					}}
				>
					<Toolbar>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<ToolsBarComponent />
							<div></div>
							<UserPopover />
						</div>
					</Toolbar>
				</AppBar>
				{/* <Settings data={state} /> */}

				{/* <Plan3D
					result_data={result_data}
					classroom_measurements={classroom_measurements}
					construction_info={construction_info}
					baths_amount={baths_amount}
					data={data}
				/> */}

				<div style={{ width: window.innerWidth - 278, height: window.innerHeight - 80, marginTop: "5.6rem", marginLeft: ".7rem" }}>
					<div>Cargando...</div>
				</div>
			</>
		)
	}

	let aforoData = JSON.parse(state.aforo);
	
	let data = {
		levels: JSON.parse(state.level).map(level => level.toLowerCase()),
		aforo: {
			inicial: aforoData.aforoInicial,
			primaria: aforoData.aforoPrimaria,
			secundaria: aforoData.aforoSecundaria
		},
		aulas: {
			inicial: aforoData.aulaInicial,
			primaria: aforoData.aulaPrimaria,
			secundaria: aforoData.aulaSecundaria
		},
		zone: state.zone,
		type: state.sublevel
	}

	console.log({ data });

	let {
        result_data,
        classroom_measurements,
        construction_info
    } = JSON.parse(state.build_data);

	let amount_bathrooms = {
		inicial: Math.ceil(aforoData.aforoInicial / 25),
		primaria: Math.ceil(aforoData.aforoPrimaria / 60),
		secundaria: Math.ceil(aforoData.aforoSecundaria / 60)
	}

	let baths_amount = []
	// let baths_amount = {}
	let total_bathrooms = amount_bathrooms.inicial + amount_bathrooms.primaria + amount_bathrooms.secundaria;

	if (data.levels.includes("inicial")) {
		let pab1_baths = amount_bathrooms.inicial <= 6 ? amount_bathrooms.inicial : 6;
		baths_amount.push({
			pab: 1,
			baths: pab1_baths
		});
		total_bathrooms -= pab1_baths;


		let pab2_baths = (amount_bathrooms.primaria + amount_bathrooms.secundaria) <= 6 ? (amount_bathrooms.primaria + amount_bathrooms.secundaria) : 6;
		baths_amount.push({
			pab: 2,
			baths: pab2_baths
		});
		total_bathrooms -= pab2_baths;

	} else {
		let pab1_baths = amount_bathrooms.primaria + amount_bathrooms.secundaria <= 6 ? amount_bathrooms.primaria + amount_bathrooms.secundaria : 6
		baths_amount.push({
			pab: 1,
			baths: pab1_baths
		});
		total_bathrooms -= baths_amount.pab1;

		
		let pab2_baths = total_bathrooms > 0 ? total_bathrooms : 0;
		baths_amount.push({
			pab: 2,
			baths: pab2_baths
		});
		total_bathrooms -= baths_amount.pab2;
	}

	console.log({ amount_bathrooms, total_bathrooms, baths_amount })

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "#ffffff",
					boxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
					WebkitBoxShadow: "0px 0px 40px 0px rgb(82 63 105 / 10%)",
				}}
			>
				<Toolbar>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<ToolsBarComponent />
						<div></div>
						<UserPopover />
					</div>
				</Toolbar>
			</AppBar>
			{/* <Settings data={state} /> */}

			<Sidebar
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				state={state}
			/>

			<div style={{ width: window.innerWidth - 278, height: window.innerHeight - 80, marginTop: "5.6rem", marginLeft: ".7rem" }}>
				<Plan3D
					result_data={result_data}
					classroom_measurements={classroom_measurements}
					construction_info={construction_info}
					baths_amount={baths_amount}
					data={data}
				/>
			</div>
		</>
	)
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
	//   zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));