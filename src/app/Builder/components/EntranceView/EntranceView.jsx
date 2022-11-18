import { useSelector } from "react-redux";
import Entrance from "../../Plan3D/components/Entrance/Entrance";
import Entrance2D from "../../PlanFloor/components/Entrance2D/Entrance2D";

export default function EntranceView({ position, rotation, classroom }) {
	let view = useSelector(state => state.building.view);
	let Classroom_OBJ = view === "3D" ? Entrance : Entrance2D;

	return <Classroom_OBJ
		position={position}
		rotation={rotation}
		classroom={classroom}
	/>
}
