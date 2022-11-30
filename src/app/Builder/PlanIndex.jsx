import { useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import ToolsBar from "./components/ToolsBar/ToolsBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from "./components/Settings/Settings";
import Plan3D from "./Plan3D/Plan3D";

export default function PlanIndex() {
	const { state } = useLocation();

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
