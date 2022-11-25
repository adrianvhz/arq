import { useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import ToolsBar from "./components/ToolsBar/ToolsBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from "./components/Settings/Settings";
import Plan3D from "./Plan3D/Plan3D";

export default function PlanIndex() {
	const { state } = useLocation();
	console.log(state);

	let aforoData = JSON.parse(state.aforo);
	let zone = state.zone;
	let type = state.sublevel;
	
	let data = {
		levels: JSON.parse(state.level).map(level => level.toLowerCase()),
		aforo: {
			inicial: aforoData.aforoInicial,
			primaria: aforoData.aforoPrimaria,
			secundaria: aforoData.aforoSecundaria
		},
		aulas: {
			inicial: aforoData.aulaInicial + 5,
			primaria: aforoData.aulaPrimaria + 5,
			secundaria: aforoData.aulaSecundaria + 5
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

	
	let baths_amount = {}
	let total_bathrooms = amount_bathrooms.inicial + amount_bathrooms.primaria + amount_bathrooms.secundaria;

	if (data.levels.includes("Inicial")) {
		let pab1_baths = amount_bathrooms.inicial;
		baths_amount.pab1 = pab1_baths <= 6 ? pab1_baths : 6;

		total_bathrooms -= baths_amount.pab1;

		let pab2_baths = amount_bathrooms.primaria + amount_bathrooms.secundaria;
		baths_amount.pab2 = pab2_baths <= 6 ? pab2_baths : 6;
		total_bathrooms -= baths_amount.pab2;

		console.log("left bathrooms", total_bathrooms);
	} else {
		let pab1_baths = amount_bathrooms.primaria + amount_bathrooms.secundaria;
		baths_amount.pab1 = pab1_baths <= 6 ? pab1_baths : 6;

		total_bathrooms -= baths_amount.pab1;

		baths_amount.pab2 = total_bathrooms > 0 ? total_bathrooms : 1;
	}

	console.log({ amount_bathrooms, total_bathrooms, baths_amount })

	return (
		<>
			<TopNavBar>
				<ToolsBar />
			</TopNavBar>

			{/* <Settings data={state} /> */}

			<Sidebar
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				state={state}
			/>

			<Plan3D
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				baths_amount={baths_amount}
				data={data}
			/>
		</>
	)
}
