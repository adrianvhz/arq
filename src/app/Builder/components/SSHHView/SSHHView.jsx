import { useSelector } from "react-redux";
import SSHH from "../../Plan3D/components/SSHH/SSHH";
import SSHH2D from "../../PlanFloor/components/SSHH2D/SSHH2D";

export default function SSHHView({ position, rotation, bathroom, baths, stairs, wall_thickness, increment_scale, index, n_pabellon }) {
	let view = useSelector(state => state.building.view);
	let SSHH_OBJ = view === "3D" ? SSHH : SSHH2D;

	return <SSHH_OBJ
		position={position}
		rotation={rotation}
		bathroom={bathroom}
		baths={baths}
		stairs={stairs}
		wall_thickness={wall_thickness}
		increment_scale={increment_scale}
		index={index}
		n_pabellon={n_pabellon}
	/>
}
