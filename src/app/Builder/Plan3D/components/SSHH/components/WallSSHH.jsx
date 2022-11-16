import { Color, DoubleSide } from "three";

export default function WallSSH({ position, rotation, length, shape, rotate, wall_thickness }) {
	let extrudeSettings = {
		steps: 2, // default: 1
		depth: wall_thickness, // default: 1  // antes: 3
		bevelEnabled: true,
		bevelSegments: 3, // esto no afecta el grosor
		bevelThickness: 0.2, // 0.5 // default: 0.2
		// bevelSize: 0.4 // default: bevelThickness - 0.1
	}
	
	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<mesh			// -(length - 0.200006105005)  OR  (-length + 0.200006105005)   NOT: (-length - 0.200006105005)
				position={[rotate ? -(length - 0.200006105005) : 0, 0, rotate ? -wall_thickness : 0]}
			>
				<extrudeGeometry
					args={[shape, extrudeSettings]}
				/>
				<meshStandardMaterial
					color={new Color(0xa5a4b1)}
					side={DoubleSide}
				/>
			</mesh>
		</object3D>
	)
}
