import { useSelector } from "react-redux";
import { Color, DoubleSide } from "three";

export default function MeshWallColor() {
	let colorWall = useSelector(state => state.building.colorWall);
	
	return (
		<meshStandardMaterial
			color={new Color(colorWall)}
			side={DoubleSide}
		/>
	)
}
