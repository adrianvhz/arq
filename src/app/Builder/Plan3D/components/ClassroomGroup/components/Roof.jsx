import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Shape, Vector2, MathUtils, DoubleSide, BackSide, Color } from "three";

export default function Roof({ position, classroom }) {
	let roof = useSelector(state => state.building.roof);
	// increment_scale prop === la misma que escala de la pared (Wall). TODO: Hacerlo dinamica (global context)
	var geom = useRef(null);
	let extra_roof = 60;
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
			position={[-extra_roof, classroom.height + 9.7, 0]}
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
