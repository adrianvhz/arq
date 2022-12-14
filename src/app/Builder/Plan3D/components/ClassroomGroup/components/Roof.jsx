import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Shape, Vector2, Box3, Color } from "three";

export default function Roof({ position, classroom, extraRoff }) {
	const [xNormal, y, z] = position;
	const roof = useSelector(state => state.building.roof);
	const ref = useRef(null);

	var thickness = 8;  // 3  ==  (0.1 * 50) - (bevelThickness * 2)    ||     5  ==  10cm   (3 for thickness and 2 for bevelThickness(1))

	var shape, length, width;
	const pts = [];

	length = classroom.length + (extraRoff * 2);
	width = classroom.width + (extraRoff);
	
	pts.push(new Vector2(0, 0));
	pts.push(new Vector2(0, width));
	pts.push(new Vector2(length, width));
	pts.push(new Vector2(length, 0));
	pts.push(new Vector2(0, 0));
	// pts.map(pt => pt.multiplyScalar(1));
	shape = new Shape(pts);

	const extrudeSettings = {
		steps: 2,
		depth: thickness, // (grosor)
		bevelEnabled: false,
		bevelSegments: 2,
		bevelThickness: 1, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}

	useEffect(() => {
		if (roof) {
			const boundingBox = new Box3().setFromObject(ref.current);
			const xSize = boundingBox.max.x - boundingBox.min.x;
			const ySize = boundingBox.max.y - boundingBox.min.y;
			const zSize = boundingBox.max.z - boundingBox.min.z;
			
			console.log("altura de techo", ySize)
		}
	});
	
	if (!roof) return null;

	return (
		<mesh										// y = classroom.height + 7.3
			position={[-extraRoff + xNormal, y, z]}  // si se cambia que y = 7.3 tambien cambiar en RoofSSHH
			rotation={[Math.PI / 2, 0, 0]}
			// scale={[1, 1, 1]}
			ref={ref}
		>
			<extrudeGeometry
				args={[shape, extrudeSettings]}
			/>
			<meshStandardMaterial
				color={new Color(0x56626f)}
			/>
		</mesh>
	)
}
