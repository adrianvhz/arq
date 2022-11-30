import { useEffect, useRef } from "react";
import { DoubleSide, Color, Box3, MathUtils } from "three";
import { createWallShape } from "../../../common/createWallShape";
import MeshWallColor from "./MeshWallColor";
import { Brush, Subtraction } from "@react-three/csg";
import DoorGeometry from "./DoorGeometry";
import WindowGeometry from "./WindowGeometry";

export default function Walls({ classroom, wall_thickness, level, index }) {
	let oClassroom = useRef(null);
	let geom = useRef(null);
	let shape = createWallShape(classroom.length - 0.200006, classroom.width - 0.200006, wall_thickness);
	
	let extrudeSettings = {
		steps: 2, // default: 1
		depth: classroom.height,
		bevelEnabled: true,
		bevelSegments: 3, // esto no afecta el grosor, default: 3
		bevelThickness: 0.2, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}

	useEffect(() => {
		// geom.current.translate(0, (-50 * 6.25) - (wall_thickness * 2), 0);

		// let boundingBox = new Box3().setFromObject(oClassroom.current);
		// const xSize = boundingBox.max.x - boundingBox.min.x;
		// const zSize = boundingBox.max.z - boundingBox.min.z;

		// index === 0 && console.log("REAL CLASSROOM LENGTH:", xSize);
		// index === 0 && console.log("REAL CLASSROOM WIDTH:", zSize);
	}, []);

	return (
		<mesh>
			<Subtraction>
				<Subtraction a>
					<Brush
						a
						position={[0, 0, (50 * 6.25) + (wall_thickness * 2) + 0.100003]} // (50 * 6.25) + ((wall_thickness + 0.2000061050056) * 2)
						rotation={[MathUtils.degToRad(-90), 0, 0]}
					>
						<extrudeGeometry
							args={[shape, extrudeSettings]}
							// ref={geom}
						/>
					</Brush>

					{/* <Brush b position={[10, 10, 30]}> */}
					<Brush b position={[30, -0.2, 320]}>
						<DoorGeometry />
					</Brush>
				</Subtraction>

				<Brush b position={[150, 30, 320]}>
					<WindowGeometry />
				</Brush>
			</Subtraction>
			<MeshWallColor level={level} />
			{/* <meshStandardMaterial /> */}
		</mesh>
	)
}


{/* <mesh
	position={[0, 0, (50 * 6.25) + (wall_thickness * 2) + 0.100003]} // (50 * 6.25) + ((wall_thickness + 0.2000061050056) * 2)
	rotation={[MathUtils.degToRad(-90), 0, 0]}
	ref={oClassroom}
>
	<extrudeGeometry
		args={[shape, extrudeSettings]}
		ref={geom}
	/>
	<MeshWallColor level={level} />
</mesh> */}
