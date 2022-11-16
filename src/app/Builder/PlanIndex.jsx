import { useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import ToolsBar from "./components/ToolsBar/ToolsBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from "./components/Settings/Settings";
import RenderScene from "./components/RenderScene/RenderScene";

export default function PlanIndex() {
	const { state } = useLocation();

	let aforo = JSON.parse(state.aforo);
	let levels = JSON.parse(state.level);

	console.log({ levels, aforo });

	let {
        result_data,
        classroom_measurements,
        construction_info
    } = JSON.parse(state.build_data);

	let amount_bathrooms = {
		inicial: aforo.aforoInicial / 25,
		primaria: aforo.aforoPrimaria / 60,
		secundaria: aforo.aforoSecundaria / 60
	}

	let baths_amount = {}

	if (levels.includes("Inicial")) {
		baths_amount.pab1 = nextEvenNum(Math.ceil(amount_bathrooms.inicial));
		if (levels.includes("Primaria") && levels.includes("Secundaria")) {
			baths_amount.pab2 = nextEvenNum(Math.ceil(amount_bathrooms.primaria + amount_bathrooms.secundaria));
		} else {
			baths_amount.pab2 = nextEvenNum(Math.ceil(amount_bathrooms[levels[0]]));
		}
	} else {
		if (levels.includes("Primaria") && levels.includes("Secundaria")) {
			baths_amount.pab1 = nextEvenNum(Math.ceil(amount_bathrooms.primaria + amount_bathrooms.secundaria));
		} else {
			baths_amount.pab1 = nextEvenNum(Math.ceil(amount_bathrooms[levels[0]]));
		}
		baths_amount.pab2 = 6;
	}

	console.log({ baths_amount });

	return (
		<>
			<TopNavBar>
				<ToolsBar />
			</TopNavBar>

			<Settings data={state} />

			<Sidebar
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				state={state}
			/>

			<RenderScene
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				baths_amount={baths_amount}
			/>
			
		</>
	)
}


function nextEvenNum(num) {
	if (num % 2 === 1) {
		return num + 1;
	} else {
		return num;
	}
}
