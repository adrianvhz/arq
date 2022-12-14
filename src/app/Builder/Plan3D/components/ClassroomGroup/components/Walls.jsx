import { useEffect, useRef } from "react";
import { DoubleSide, Color, Box3, MathUtils } from "three";
import { Brush, Subtraction } from "@react-three/csg";
import { createWallShape } from "../../../common/createWallShape";
import MeshWallColor from "./MeshWallColor";
import DoorGeometry from "./DoorGeometry";
import WindowGeometry from "./WindowGeometry";

export default function Walls({ classroom, wall_thickness, level, index }) {
	let oClassroom = useRef(null);
	let geom = useRef(null);
	let shape = createWallShape(classroom.length, classroom.width, wall_thickness);
	
	let extrudeSettings = {
		steps: 2, // default: 1
		depth: classroom.height,
		bevelEnabled: false,
		bevelSegments: 3, // esto no afecta el grosor, default: 3
		bevelThickness: 0.2, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}

	useEffect(() => {
		// let boundingBox = new Box3().setFromObject(oClassroom.current);
		// const xSize = boundingBox.max.x - boundingBox.min.x;
		// const zSize = boundingBox.max.z - boundingBox.min.z;

		// index === 0 && console.log("REAL CLASSROOM LENGTH:", xSize);
		// index === 0 && console.log("REAL CLASSROOM WIDTH:", zSize);
	}, []);

	return (
		<>
			<mesh>
				<Subtraction>
					<Subtraction a>
						<Brush
							a
							position={[0, 0, (50 * 6.25) + (wall_thickness * 2)]}
							rotation={[MathUtils.degToRad(-90), 0, 0]}
						>
							<extrudeGeometry
								args={[shape, extrudeSettings]}
							/>
						</Brush>

						<Brush b position={[30, -0.2, 320]}>
							<DoorGeometry />
						</Brush>
					</Subtraction>

					<Brush b position={[150, 30, 320]}>
						<WindowGeometry />
					</Brush>
				</Subtraction>
				<MeshWallColor level={level} />
			</mesh>
			<mesh position={[7.5 / 2, classroom.height + ((0.20 * 50) / 2), classroom.width / 2]}>
				<boxGeometry args={[7.5, 0.20 * 50, classroom.width - (0.30 * 50 * 2)]} />
				<meshStandardMaterial />
			</mesh>
			<mesh position={[classroom.length - (7.5 / 2), classroom.height + ((0.20 * 50) / 2), classroom.width / 2]}>
				<boxGeometry args={[7.5, 0.20 * 50, classroom.width - (0.30 * 50 * 2)]} />
				<meshStandardMaterial />
			</mesh>
		</>
	)
}
