import { Color, DoubleSide } from "three";
import { Brush, Subtraction } from "@react-three/csg";
import EntranceGeometry from "./EntranceGeometry";
import { createWallShape } from "../../../common/createWallShape";

export default function WallSSH({ position, rotation, length, rotate, wall_thickness }) {
	let shape = createWallShape((((0.60 * 50) + (1.20 * 50) + (1.40 * 50)) * 2) + (wall_thickness * 2) - 0.200006, (((0.85 * 50) * 4) + (8 * 5)) + (wall_thickness * 2) - 0.200006, wall_thickness);
	
	let extrudeSettings = {
		steps: 2, // default: 1
		depth: 125,
		bevelEnabled: true,
		bevelSegments: 3, // esto no afecta el grosor, default: 3
		bevelThickness: 0.2, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}
	
	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<mesh>
				<Subtraction>
					<Brush
						a
						position={[0, 0, (((0.85 * 50) * 4) + (8 * 5)) + (wall_thickness * 2) - 0.200006]}
						rotation={[-Math.PI / 2, 0, 0]}
					>
						<extrudeGeometry
							args={[shape, extrudeSettings]}
						/>
					</Brush>

					<Brush b position={[137, -1, 217]}>
						<EntranceGeometry />
					</Brush>
				</Subtraction>
				<meshStandardMaterial color={0xb8c5d3} />
			</mesh>
		</object3D>
	)
}










// import { Color, DoubleSide } from "three";
// import { Brush, Subtraction } from "@react-three/csg";
// import EntranceGeometry from "./EntranceGeometry";
// import { createWallShape } from "../../../common/createWallShape";

// export default function WallSSH({ position, rotation, length, shape, rotate, wall_thickness }) {
// 	// let extrudeSettings = {
// 	// 	steps: 2, // default: 1
// 	// 	depth: wall_thickness, // default: 1
// 	// 	bevelEnabled: true,
// 	// 	bevelSegments: 3, // esto no afecta el grosor
// 	// 	bevelThickness: 0.2, // default: 0.2
// 	// 	// bevelSize: 0.1 // default: bevelThickness - 0.1
// 	// }

// 	let shape1 = createWallShape((((0.60 * 50) + (1.20 * 50) + (1.40 * 50)) * 2) - 0.200006, ((0.85 * 50) * 3) - 0.200006, wall_thickness);
	
// 	let extrudeSettings = {
// 		steps: 2, // default: 1
// 		depth: 125,
// 		bevelEnabled: true,
// 		bevelSegments: 3, // esto no afecta el grosor, default: 3
// 		bevelThickness: 0.2, // default: 0.2
// 		// bevelSize: 0.1 // default: bevelThickness - 0.1
// 	}
	
// 	return (
// 		<object3D
// 			position={position}
// 			rotation={rotation}
// 		>
// 			{/* <mesh			// -(length - 0.200006105005)  OR  (-length + 0.200006105005)   NOT: (-length - 0.200006105005)
// 				// position={[rotate ? -(length - 0.200006105005) : 0, 0, rotate ? -wall_thickness : 0]}
// 			>
// 				<extrudeGeometry
// 					args={[shape, extrudeSettings]}
// 				/>
// 				<meshStandardMaterial
// 					color={new Color(0xa5a4b1)}
// 					side={DoubleSide}
// 				/>
// 			</mesh> */}

// 			<mesh>
// 			<Subtraction>
// 				<Brush
// 					a
// 					position={[0, 0, 0]}
// 					rotation={[-Math.PI / 2, 0, 0]}
// 				>
// 					<extrudeGeometry
// 						args={[shape1, extrudeSettings]}
// 					/>
// 				</Brush>

// 				<Brush b position={[30, 0, 320]}>
// 					<EntranceGeometry />
// 				</Brush>
// 			</Subtraction>
// 			<meshStandardMaterial />
// 		</mesh>
// 		</object3D>
// 	)
// }
