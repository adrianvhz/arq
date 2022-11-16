import { DoubleSide, Color } from "three";
import { createWallSSHHShape } from "../../../common/createWallSSHHShape";

export default function CubiculoWall({ position, bathroom, separacion_cubiculos, wall_thickness }) {
	let cubiculo = {
		length: bathroom.inodoro,
		height: 125
	}

	let cubiculoShape = createWallSSHHShape(cubiculo.length, cubiculo.height);

	let extrudeSettings = {
		steps: 2, // default: 1
		depth: wall_thickness, // default: 1  // antes: 3
		bevelEnabled: true,
		bevelSegments: 3, // esto no afecta el grosor
		bevelThickness: 0.2, // 0.5 // default: 0.2
		// bevelSize: 0.4 // default: bevelThickness - 0.1
	}

	return (
		<group
			position={position}
		>
			<mesh
				position={[-cubiculo.length, 0, 0]}
			>
				<extrudeGeometry
					args={[cubiculoShape, extrudeSettings]}
				/>
				<meshStandardMaterial color={new Color(0xfffaf0)} side={DoubleSide} />
			</mesh>
			<mesh
				position={[separacion_cubiculos, 0, 0]}
			>
				<extrudeGeometry
					args={[cubiculoShape, extrudeSettings]}
				/>
				<meshStandardMaterial color={new Color(0xfffaf0)} side={DoubleSide} />
			</mesh>

		</group>
	)
}
