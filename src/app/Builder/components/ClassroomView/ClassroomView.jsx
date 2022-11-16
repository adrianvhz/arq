import { useSelector } from "react-redux";
import ClassroomGroup from "../../Plan3D/components/ClassroomGroup/ClassroomGroup";
import Classroom2D from "../../PlanFloor/components/Classroom2D/Classroom2D";

export default function ClassroomView({ position, rotation, classroom, increment_scale, wall_thickness, index }) {
	let view = useSelector(state => state.building.view);
	let Classroom_OBJ = view === "3D" ? ClassroomGroup : Classroom2D;

	return <Classroom_OBJ
		position={position}
		rotation={rotation}
		classroom={classroom}
		increment_scale={increment_scale}
		wall_thickness={wall_thickness}
		index={index}
	/>
}
