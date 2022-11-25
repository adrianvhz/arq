import { useSelector } from "react-redux";
import { Shape, Vector2, MathUtils, DoubleSide, BackSide, Color } from "three";

export default function Roof({ position, classroom }) {
	let roof = useSelector(state => state.building.roof);

	let extra_roof = 50;
	let thickness = 3

	var shape, length, width;
	var pts = [];

	length = classroom.length + (extra_roof * 2);
	width = classroom.width;
	
	pts.push(new Vector2(0, 0));
	pts.push(new Vector2(0, width));
	pts.push(new Vector2(length, width));
	pts.push(new Vector2(length, 0));
	pts.push(new Vector2(0, 0));
	// pts.map(pt => pt.multiplyScalar(1));
	shape = new Shape(pts);

	var extrudeSettings = {
		steps: 2,
		depth: thickness, // (grosor)
		bevelEnabled: true,
		bevelSegments: 2,
		bevelThickness: 4, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}

	if (!roof) return null;

	return (
		<mesh
			position={[-extra_roof, classroom.height + 7.3, 0]}  // si se cambia que y = 7.3 tambien cambiar en RoofSSHH
			rotation={[MathUtils.degToRad(90), 0, 0]}
			scale={[1, 1.15, 1]}
		>
			<extrudeGeometry
				args={[shape, extrudeSettings]}
			/>
			<meshStandardMaterial
				color={new Color(0x56626f)}
				side={DoubleSide}
			/>
		</mesh>
	)
}
