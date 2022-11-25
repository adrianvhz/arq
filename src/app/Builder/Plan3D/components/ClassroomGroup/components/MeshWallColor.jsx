import { useSelector } from "react-redux";
import { Color, DoubleSide } from "three";

export default function MeshWallColor({level}) {
	let colorWall = useSelector(state => state.building.colorWall);
	
	return (
		<meshStandardMaterial
			// color={new Color(colorWall)}
			color={new Color(level === "inicial" ? "yellow" : (level === "primaria" ? "lightblue" : (level === "secundaria" ? "darkgreen" : "")))}
			side={DoubleSide}
		/>
	)
}
