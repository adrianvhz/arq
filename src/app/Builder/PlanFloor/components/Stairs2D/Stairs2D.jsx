import { Shape, Color } from "three";
import { Text } from "@react-three/drei";
import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function Stairs2D({ position, rotation, stairs, n_pabellon, index }) {
	let half_width = stairs.width / 2;
	let half_length = stairs.length / 2;

	let shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();

	// let shape = new Shape();
	// shape.moveTo(0, 0);
	// shape.lineTo(0, stairs.width);
	// shape.lineTo(stairs.length, stairs.width);
	// shape.lineTo(stairs.length, 0);
	// shape.closePath();

	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<group
				position={[48, 0, 125]}
				rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
			>
				<line>
					<shapeGeometry
						args={[shape]}
					/>
					<lineBasicMaterial
						color={new Color(0x383838)}
					/>
				</line>

				<mesh>
					<shapeGeometry
							args={[shape]}
						/>
					<meshStandardMaterial
						color={new Color(0xf0ebec)}
					/>
				</mesh>

				<Text
					position={[0, 0, 3]}
					color="black"
					font={InterBold}
					anchorX="center"
					anchorY="middle"
					fontSize={45}
					children={"Escaleras"}
				/>
			</group>
		</object3D>
	)
}
