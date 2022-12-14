import { Shape, Vector2, Color } from "three";
import { Text } from "@react-three/drei";
import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Entrance2D({ position, rotation, classroom, wall_thickness }) {
	let length = classroom.length;
	let width = classroom.width;

	let shape;
	var pts = [];

	pts.push(new Vector2(0, 0));
	pts.push(new Vector2(0, width - (wall_thickness * 2)));
	pts.push(new Vector2(length - (wall_thickness * 2), width - (wall_thickness * 2)));
	pts.push(new Vector2(length - (wall_thickness * 2), 0));
	pts.push(new Vector2(0, 0));
	shape = new Shape(pts);

	return (
		<group
			position={position}
			rotation={[-Math.PI / 2, 0, rotation[1]]}
		>
			<line
				position={[0, -((50 * 6.25) + (wall_thickness * 2)), 0]}
			>
				<shapeGeometry args={[shape]} />
				<lineBasicMaterial
					color={new Color(0x000000)}
				/>
			</line>
			
			<mesh
				position={[0, -((50 * 6.25) + (wall_thickness * 2)), 0]}
			>
				<shapeGeometry
					args={[shape]}
				/>
				<meshStandardMaterial
					color={new Color(0xb1acb9)}
				/>
			</mesh>

			<Text
				position={[207, -160, 3]}
				// rotation={[-Math.PI / 2, 0, 0]}
				color="black"
				font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={85}
				children={" Acceso\nPrincipal"}
			/>
		</group>
	)
}
