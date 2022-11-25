import { useSelector } from "react-redux";
import SSHH from "../../Plan3D/components/SSHH/SSHH";
import SSHH2D from "../../PlanFloor/components/SSHH2D/SSHH2D";

export default function SSHHView({ position, rotation, bathroom, baths, wall_thickness, increment_scale, floor, index, n_pabellon }) {
	let view = useSelector(state => state.building.view);
	let view3DModule = useSelector(state => state.building.view3DModule);
	let view2DModule = useSelector(state => state.building.view2DModule);

	let SSHH_OBJ;

	if (view === "3D") {
		if (view3DModule === 1 && floor > 1) return null;
		else {
			SSHH_OBJ = SSHH;
		}
	} else {
		if (view2DModule === 1 && floor > 1) return null;
		else if (view2DModule > 1 && floor === 1) return null;
		else {
			SSHH_OBJ = SSHH2D;
		}
	}

	return <SSHH_OBJ
		position={position}
		rotation={rotation}
		bathroom={bathroom}
		baths={baths}
		wall_thickness={wall_thickness}
		increment_scale={increment_scale}
		index={index}
		n_pabellon={n_pabellon}
	/>
}
