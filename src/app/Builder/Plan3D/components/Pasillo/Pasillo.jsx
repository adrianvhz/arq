import { Shape, Color, DoubleSide } from "three";
import { useSelector } from "react-redux";

export default function Pasillo({ args, position, rotation, color }) {
	let view = useSelector(state => state.building.view);

	let [width, length] = args;

	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, width);
	shape.lineTo(length, width);
	shape.lineTo(length, 0);
	shape.lineTo(0, 0);
	
	if (view === "2D") return null;

	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			<shapeGeometry args={[shape]} />
			<meshStandardMaterial
				side={DoubleSide}
				color={new Color(color)}
			/>
		</mesh>
	)
}
