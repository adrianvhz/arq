import { useEffect, useRef } from "react";
import { Shape } from "three";
import { Text } from "@react-three/drei";
import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Classroom2D({ position, rotation, classroom, wall_thickness }) {
	let outlinedGeom = useRef(null);
	let fillGeom = useRef(null);

	const createSquareShape = (width, length) => {
		let squareShape = new Shape();
		squareShape.moveTo(0, 0);
		squareShape.lineTo(0, width - wall_thickness);
		squareShape.lineTo(length - wall_thickness, width - wall_thickness);
		squareShape.lineTo(length - wall_thickness, 0);
		squareShape.closePath();
		return squareShape;
	}

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
					args={[createSquareShape(classroom.width, classroom.length)]}
					ref={outlinedGeom}
				/>
				<lineBasicMaterial
					color={0x383838}
				/>
			</line>

			<mesh
				position={[1, 0, ((50 * 6.25) + (wall_thickness * 2)) - 1]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[createSquareShape(classroom.width - 2, classroom.length - 2)]}
					ref={fillGeom}
				/>
				<meshBasicMaterial
					color={0xb2b2b2}	
				/>
			</mesh>

			<Text
				position={[200, 1, 162]}
				rotation={[-Math.PI / 2, 0, 0]} //
				color="black"
				font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={100}
				children={"   Sala\nClases"}
			/>
		</group>
	)
}
