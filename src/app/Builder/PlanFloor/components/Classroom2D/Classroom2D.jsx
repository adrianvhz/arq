import { useEffect, useRef } from "react";
import { Color, Shape } from "three";
import { Text } from "@react-three/drei";
import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Classroom2D({ position, rotation, classroom, wall_thickness }) {
	let outlinedGeom = useRef(null);
	let fillGeom = useRef(null);

	let shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, classroom.width - (wall_thickness * 2));
	shape.lineTo(classroom.length - (wall_thickness * 2), classroom.width - (wall_thickness * 2));
	shape.lineTo(classroom.length - (wall_thickness * 2), 0);
	shape.closePath();
		
	useEffect(() => {
		// outlinedGeom.current.translate(0, (-50 * 6.25) - (wall_thickness * 2), 0);
		// fillGeom.current.translate(0, (-50 * 6.25) - (wall_thickness * 2), 0);
		// fill.current.translateX((-50 * 6.25) - (wall_thickness * 2));
	}, []) // , [] significa que solo se ejecutara una vez y nada mas.
	// Si useEffect no tienen ningun array simplemente se ejectura siempre despues de enviar el DOM.

	return (
		<group
			position={position}
			rotation={rotation}
		>
			<line
				position={[0, 0, (50 * 6.25) + (wall_thickness * 2)]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[shape]}
					ref={outlinedGeom}
				/>
				<lineBasicMaterial
					color={new Color(0x383838)}
				/>
			</line>

			<mesh
				position={[0, 0, ((50 * 6.25) + (wall_thickness * 2))]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[shape]}
					ref={fillGeom}
				/>
				<meshBasicMaterial
					color={0xb2b2b2}	
				/>
			</mesh>

			<Text
				position={[200, 1, 162]}
				rotation={[-Math.PI / 2, 0, 0]}
				color="black"
				font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={85}
				children={"   Sala\nClases"}
			/>
		</group>
	)
}
