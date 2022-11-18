import { useSelector } from "react-redux";
import ClassroomGroup from "../../Plan3D/components/ClassroomGroup/ClassroomGroup";
import Classroom2D from "../../PlanFloor/components/Classroom2D/Classroom2D";

export default function ClassroomView({ position, rotation, classroom, increment_scale, floor, wall_thickness, index }) {
	let view = useSelector(state => state.building.view);
	let view2DModule = useSelector(state => state.building.view2DModule);

	let Classroom_OBJ;

	if (view === "3D") {
		Classroom_OBJ = ClassroomGroup;
	} else {
		if (view2DModule === 1 && floor > 1) return null;
		else if (view2DModule > 1 && floor === 1) return null;
		else {
			Classroom_OBJ = Classroom2D;
		}
	}

	return <Classroom_OBJ
		position={position}
		rotation={rotation}
		classroom={classroom}
		increment_scale={increment_scale}
		wall_thickness={wall_thickness}
		index={index}
	/>
}
