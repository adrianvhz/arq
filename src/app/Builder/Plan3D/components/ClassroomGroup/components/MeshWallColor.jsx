import { useSelector } from "react-redux";
import { Color, DoubleSide } from "three";

export default function MeshWallColor({ level }) {
	let colorWall = useSelector(state => state.building.colorWall);
	let colorForLevel = useSelector(state => state.building.colorForLevel);

	return (
		<meshStandardMaterial
			// color={new Color(colorWall)}
			color={colorForLevel ? new Color(level === "inicial" ? 0xffff9d : (level === "primaria" ? 0x576698 : (level === "secundaria" ? 0x556b2f : ""))) : 0xffffff}
			side={DoubleSide}
		/>
	)
}
