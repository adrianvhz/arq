import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Shape, Vector2, MathUtils, DoubleSide, BackSide, Color } from "three";

export default function RoofSSHH({ position }) {
	let roof = useSelector(state => state.building.roof);
	// increment_scale prop === la misma que escala de la pared (Wall). TODO: Hacerlo dinamica (global context)
	let extra_roof = 60;
	let thickness = 3

	var shape, length, width;
	var pts = [];

	length = 370
	width = 200
	
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
		bevelThickness: 5,
		bevelSize: 1,
		bevelSegments: 2,
	}

	useEffect(() => {
		// geom.current.rotateX(MathUtils.degToRad(90));
		// geom.current.scale(1, 1, 1.3)
	});

	if (!roof) return null;

	return (
		<mesh
			position={[-extra_roof - 85, (2.5 * 50) + 9.7, -166]}
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
