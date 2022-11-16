import { Color, DoubleSide } from "three";
import { createWallSSHHShape } from "../../../common/createWallSSHHShape";

export default function SeparacionWall({ position, rotation, bathroom, wall_thickness }) {
	let separacion = {
		length: bathroom.ancho_de_cubiculo,
		height: 125
	}

	let separacionShape = createWallSSHHShape(separacion.length, separacion.height);

	let extrudeSettings = {
		steps: 2, // default: 1
		depth: wall_thickness, // default: 1  // antes: 3
		bevelEnabled: true,
		bevelSegments: 3, // esto no afecta el grosor
		bevelThickness: 0.2, // 0.5 // default: 0.2
		// bevelSize: 0.4 // default: bevelThickness - 0.1
	}

	return ( // pared de separacion vertical
		<mesh
			position={position}
			rotation={rotation}
		>
			<extrudeGeometry
				args={[separacionShape, extrudeSettings]}
			/>
			<meshStandardMaterial
				color={new Color(0xfffaf0)}
				side={DoubleSide}
			/>
		</mesh>
	)
}
