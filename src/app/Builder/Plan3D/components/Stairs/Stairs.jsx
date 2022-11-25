import { useEffect, useRef } from "react";
import { Box3, MathUtils } from "three";
import Flight from "./components/Flight";
import Landing from "./components/Landing";

export default function Stairs({ position, rotation, stairs, index }) {
	let oStairs = useRef(null);

	useEffect(() => {
		// geom.current.translate(0, (-50 * 6.25) - (7.5 * 2), 0);

		var boundingBox = new Box3().setFromObject(oStairs.current);
		const xSize = boundingBox.max.x - boundingBox.min.x;
		const ySize = boundingBox.max.y - boundingBox.min.y;
		const zSize = boundingBox.max.z - boundingBox.min.z;

		index === 0 && console.log("REAL STAIRS LENGTH:", { ancho: xSize / 50, alto: (ySize / 50) + " (16 escalones * 0.17m)", largo: zSize / 50 });
	});

	// let initialPosLanding (x) = -4.25;
	
	let landing = {
		x: 0, // 67.3
		y: 0,
		z: stairs.flight.tread * stairs.flight1_amount + 42.5
	}

	let flight = {
		x: 0,
		y: 0,
		z: stairs.flight.tread * stairs.flight1_amount
	}

	return (
		<object3D
			position={position}
			rotation={rotation}
			// position={[0, 3.5, 0]}
			// position={[-30, 3.5, 1350]}
			// position={[0, 2.5, 0]}
			ref={oStairs}
		>
			<group // pos x es para encajar bien en el espacio que debe estar (ocupa 120u  o  2.4 metros)
				position={[59.88, 0, stairs.landing.width]}
			>
				<Landing
					position={[landing.x, landing.y, landing.z]} // z = 155.25
					// position={[67.3, initialPosLanding, 0]} // z = 155.25
					landing={stairs.landing}
				/>

				<Flight
					position={[0, 0, flight.z]} // z = 191.5
					// position={[97.3, 0, 36.25]} // z = 191.5
					stairs={stairs}
					amount={stairs.flight1_amount}
				/>
				
				<Landing
					position={[landing.x, landing.y + (stairs.flight.riser * stairs.flight1_amount), -5 - stairs.flight.tread]}
					landing={stairs.landing}	// z   =   landing.z - (stairs.flight.tread * stairs.flight1_amount) - stairs.landing.width
				/>

				<Flight
					position={[0, stairs.flight.riser * stairs.flight1_amount, stairs.flight.tread * 2]}
					rotation={[0, MathUtils.degToRad(180), 0]}
					stairs={stairs}
					amount={stairs.flight2_amount}
				/>
				
				<Landing
					position={[landing.x, landing.y + (stairs.flight.riser * (stairs.flight1_amount + stairs.flight2_amount)), landing.z]} // z = 155.25
					landing={stairs.landing}
				/>
			</group>
		</object3D>
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
