import { useEffect, useRef } from "react";
import { Box3, DoubleSide } from "three";
import WallSSHH from "./components/WallSSHH";
import Bathroom from "./components/Bathroom";
import Pasillo from "./components/Pasillo";
import StairsView from "../../../components/StairsView/StairsView";
import WallsClass from "./components/WallsClass";
import RoofSSHH from "./components/RoofSSHH";

export default function SSHH({ position, rotation, bathroom, baths, wall_thickness, increment_scale, n_pabellon }) {
	// 1 compensacion de pared grosor en paralelo

	const { pasillo, inodoro, pasillo_de_entrada } = bathroom;
	
	let oSSHH = useRef(null);
	let baths_amount = castEvenNum(baths) / 2;

	// let walls = new WallsClass(bathroom, baths_amount, wall_thickness);

	// n_pabellon === 1 && console.log("APARENTE TOTAL WIDTH DEL BATHROOM:", walls.back.length);
	
	useEffect(() => {
		// var boundingBox = new Box3().setFromObject(oSSHH.current);
		// const xSize = boundingBox.max.x - boundingBox.min.x;
		// n_pabellon === 1 && console.log("REAL BATHROOM LENGTH:", xSize);
		// console.log("REAL BATHROOM LENGTH:", xSize);
	}, []);
	
	if (baths_amount === 0) return null;

	return (
		<group
			position={position}
			rotation={rotation}
			ref={oSSHH}
		>
			<WallSSHH
				// position={walls[el.wall].position[el.num]}
				// rotation={walls[el.wall].rotation[el.num]}
				// length={walls[el.wall].length}
				// rotate={el.rotate}
				wall_thickness={wall_thickness}
			/>

			{/* 1 metro para ver la dimension del pasillo */}
			{/* <mesh position={[167.6, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[50, 50]} />
				<meshBasicMaterial side={DoubleSide} />
			</mesh> */}

			<Bathroom
				bathroom={bathroom}
				amount={baths_amount}
				increment_scale={increment_scale}
				wall_thickness={wall_thickness}
				// total_width={walls.back.length}
			/>

			{/* PASILLO DE ENTRADA */}
			<Pasillo
				// args={[pasillo_de_entrada, walls.back.length]}
				args={[pasillo_de_entrada, 200]}
				position={[-0.1, 0.01, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/>

			{/* PASILLO LEFT */}
			{/* <Pasillo
				args={[walls.sides.length, pasillo]}
				position={[0, 0.01, (-walls.sides.length / 2) - 0.5]}
				rotation={[-Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/> */}

			{/* PASILLO RIGTH */}
			{/* <Pasillo
				args={[walls.sides.length, pasillo]}
				position={[inodoro + wall_thickness + 1, 0.01, (-walls.sides.length / 2) - 0.5]}
				rotation={[-Math.PI / 2, 0, 0]}
				color={0x3d3d3d}
			/> */}

			{/* <RoofSSHH retroceder={walls.sides.length} /> */}
			<RoofSSHH retroceder={200} />
		</group>
	)
}

function castEvenNum(num) {
	if (num % 2 === 1) {
		return num + 1;
	} else {
		return num;
	}
}















// import { useEffect, useRef } from "react";
// import { Box3, DoubleSide } from "three";
// import WallSSHH from "./components/WallSSHH";
// import Bathroom from "./components/Bathroom";
// import Pasillo from "./components/Pasillo";
// import StairsView from "../../../components/StairsView/StairsView";
// import WallsClass from "./components/WallsClass";
// import RoofSSHH from "./components/RoofSSHH";

// export default function SSHH({ position, rotation, bathroom, baths, wall_thickness, increment_scale, n_pabellon }) {
// 	// 1 compensacion de pared grosor en paralelo

// 	const { pasillo, inodoro, pasillo_de_entrada } = bathroom;
	
// 	let oSSHH = useRef(null);
// 	let baths_amount = castEvenNum(baths) / 2;

// 	let wallsArr = [
// 		{
// 			wall: "front",
// 			num: 1
// 		},
// 		{
// 			wall: "front",
// 			num: 2
// 		},
// 		{
// 			wall: "sides",
// 			num: 1,
// 			rotate: true
// 		},
// 		{
// 			wall: "sides",
// 			num: 2
// 		},
// 		{
// 			wall: "back",
// 			num: 1,
// 			rotate: true
// 		}
// 	]
	
// 	let walls = new WallsClass(bathroom, baths_amount, wall_thickness);

// 	n_pabellon === 1 && console.log("APARENTE TOTAL WIDTH DEL BATHROOM:", walls.back.length);
	
// 	useEffect(() => {
// 		// var boundingBox = new Box3().setFromObject(oSSHH.current);
// 		// const xSize = boundingBox.max.x - boundingBox.min.x;
// 		// n_pabellon === 1 && console.log("REAL BATHROOM LENGTH:", xSize);
// 		// // console.log("REAL BATHROOM LENGTH:", xSize);
// 	}, []);
	
// 	if (baths_amount === 0) return null;

// 	return (
// 		<group
// 			position={position}
// 			rotation={rotation}
// 			ref={oSSHH}
// 		>
// 			<group	// classroom length - bathroom length === 79.33       // 192.67
// 				// position={[272 - (este ? 79.33 : 79.33), 0, sides_wall.length + wall_thickness]}
// 				position={[0, 0, walls.sides.length + wall_thickness]}  // x 192.67
// 			>
// 				{/* {wallsArr.map((el, index) => { */}
// 					{/* return ( */}
// 						<WallSSHH
// 							// key={index}
// 							// position={walls[el.wall].position[el.num]}
// 							// rotation={walls[el.wall].rotation[el.num]}
// 							// length={walls[el.wall].length}
// 							// shape={walls[el.wall].shape}
// 							// rotate={el.rotate}
// 							wall_thickness={wall_thickness}
// 						/>
// 					{/* ) */}
// 				{/* })} */}

// 				{/* 1 metro para ver la dimension del pasillo */}
// 				{/* <mesh position={[167.6, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
// 					<planeGeometry args={[50, 50]} />
// 					<meshBasicMaterial side={DoubleSide} />
// 				</mesh> */}

// 				<Bathroom
// 					bathroom={bathroom}
// 					amount={baths_amount}
// 					increment_scale={increment_scale}
// 					wall_thickness={wall_thickness}
// 					// total_width={walls.back.length}
// 				/>

// 				{/* PASILLO DE ENTRADA */}
// 				<Pasillo
// 					args={[pasillo_de_entrada, walls.back.length]}
// 					position={[-0.1, 0.01, 0]}
// 					rotation={[-Math.PI / 2, 0, 0]}
// 					color={0x3d3d3d}
// 				/>

// 				{/* PASILLO LEFT */}
// 				{/* <Pasillo
// 					args={[walls.sides.length, pasillo]}
// 					position={[0, 0.01, (-walls.sides.length / 2) - 0.5]}
// 					rotation={[-Math.PI / 2, 0, 0]}
// 					color={0x3d3d3d}
// 				/> */}

// 				{/* PASILLO RIGTH */}
// 				{/* <Pasillo
// 					args={[walls.sides.length, pasillo]}
// 					position={[inodoro + wall_thickness + 1, 0.01, (-walls.sides.length / 2) - 0.5]}
// 					rotation={[-Math.PI / 2, 0, 0]}
// 					color={0x3d3d3d}
// 				/> */}

// 				<RoofSSHH retroceder={walls.sides.length} />
// 			</group>
// 		</group>
// 	)
// }

// function castEvenNum(num) {
// 	if (num % 2 === 1) {
// 		return num + 1;
// 	} else {
// 		return num;
// 	}
// }
