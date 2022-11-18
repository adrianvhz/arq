import { useEffect, useRef } from "react";
import { DoubleSide, Box3, Vector2, MathUtils } from "three";
import { createWallShape } from "../../common/createWallShape";
import Flight from "./components/Flight";
import Landing from "./components/Landing";

export default function Stairs({ position, index, stairs }) {
	let obj = useRef(null);
	let geom = useRef(null);
	let shape = createWallShape((2.40 * 50) + (7.5 * 2), (3.90 * 50) + (7.5 * 2), 7.5);
	let extrudeSettings = {
		steps: 2,
		depth: 100,
		bevelEnabled: false,
		bevelSegments: 3, // esto no afecta el grosor, default: 3
		// bevelThickness: 0.2, // default: 0.2
		// bevelSize: 0.1 // default: bevelThickness - 0.1
	}

	useEffect(() => {
		// geom.current.translate(0, (-50 * 6.25) - (7.5 * 2), 0);

		var boundingBox = new Box3().setFromObject(obj.current);
		const xSize = boundingBox.max.x - boundingBox.min.x;
		const ySize = boundingBox.max.y - boundingBox.min.y;
		const zSize = boundingBox.max.z - boundingBox.min.z;

		index === 0 && console.log("REAL STAIRS LENGTH:", { ancho: xSize / 50, alto: (ySize / 50) + " (16 escalones * 0.17m)", largo: zSize / 50 });
	});

	let initialPosLanding = -4.25;

	return (
		<group
			position={position}
			rotation={[0, -Math.PI, 0]}
			// position={[0, 3.5, 0]}
			// position={[-30, 3.5, 1350]}
			// position={[0, 2.5, 0]}
			ref={obj}
		>
			{/* <mesh
				rotation={[MathUtils.degToRad(-90), 0, 0]}
				ref={obj}
			>
				<extrudeGeometry
					args={[shape, extrudeSettings]}
					ref={geom}
				/>
				<meshStandardMaterial
					// color={new Color(0x2f4f4f)}
					side={DoubleSide}
				/>
			</mesh> */}

			<group>
				<Landing
					position={[67.3, initialPosLanding, 0]} // z = 155.25
					landing={stairs.landing}
				/>

				<Flight
					position={[97.3, 0, 36.25]} // z = 191.5
					amount={stairs.flight1_amount}
					flight={stairs.flight}
				/>
				
				<Landing
					position={[67.3, initialPosLanding + (stairs.flight.riser * stairs.flight1_amount), (stairs.flight.tread * stairs.flight1_amount) + stairs.landing.width]} // z = 315.2  159.95
					landing={stairs.landing}
				/>

				<Flight
					position={[37.3, (stairs.flight.riser * stairs.flight1_amount), (stairs.flight.tread * (stairs.flight2_amount - 1)) + 36.25]} // z = 279  123.75
					rotation={[0, MathUtils.degToRad(180), 0]}
					amount={stairs.flight2_amount}
					flight={stairs.flight}
				/>
				
				<Landing
					position={[67.3, initialPosLanding + (stairs.flight.riser * (stairs.flight1_amount + stairs.flight2_amount)), 0]} // z = 155.25
					landing={stairs.landing}
				/>
			</group>
		</group>
	)
}


















// let parent = useRef(null);
// 	let greenSphere = useRef(null);
// 	let geom = useRef(null);

// 	useFrame(() => {
// 		// greenSphere.current.rotateY(0.05);
// 		parent.current.rotateY(0.009);
// 	})



// 	useEffect(() => {
// 		// geom.current.translate(100, 0, 5);
// 	});
// 	return (
// 		<object3D ref={parent}>
// 			<mesh ref={greenSphere} position={[(5), 10, 0]}>
// 				<boxGeometry args={[10, 10, 10]} ref={geom}  />
// 				<meshStandardMaterial color={"green"} />
// 			</mesh>
// 		</object3D>
// 	)