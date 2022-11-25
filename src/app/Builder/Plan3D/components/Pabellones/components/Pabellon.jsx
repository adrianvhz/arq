import { useEffect, useRef } from "react";
import { MathUtils, Box3 } from "three";
import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
import EntranceView from "../../../../components/EntranceView/EntranceView";
import SSHHView from "../../../../components/SSHHView/SSHHView";
import StairsView from "../../../../components/StairsView/StairsView";

export default function Pabellon({ position, rotation, amountSide1, amountSide2, classroom, bathroom, increment_scale, pasillo, terrain, classrooms_for_peine, floors_above, baths, stairs, index, wall_thickness }) {
	let pabellon_group = useRef(null);
	let n_pabellon = index + 1;

	let classrooms = [];

	const addClassroomPosition = (x) => {
		return n_pabellon === 1 ? x + classroom.length : x - classroom.length;
	}

	const stairsOffset = (x) => {
		return n_pabellon === 1 ? x - (classroom.length - 120) : x + (classroom.length - 120);
	}

	const bathroomOffset = (x) => {
		return n_pabellon === 1 ? x - (classroom.length - 334.9999938979745) : x + (classroom.length - 334.9999938979745);
	}

	const buildF = () => {
		let x = 0;
		let y = 0;
		let z = 0;

		// side 1
		for (let i = 0; i < amountSide1; i++) {
			classrooms.push({
				position: [x, y, z],
				room: ClassroomView,
				floor: 1
			});
			x = addClassroomPosition(x);
		}
		
		// stairs
		if (!!floors_above) {
			x = stairsOffset(x);
			classrooms.push({
				position: [x, y, z],
				room: StairsView,
				n_pabellon: n_pabellon,
				floor: 1
			});
			x = addClassroomPosition(x);
		}

		// bathroom
		x = bathroomOffset(x);
		classrooms.push({
			position: [x, y, z],
			room: SSHHView,
			bathroom: bathroom,
			baths: baths,
			floor: 1
		});
		x = addClassroomPosition(x);

		// side 2
		for (let i = 0; i < amountSide2; i++) {
			classrooms.push({
				position: [x, y, z],
				room: ClassroomView,
				floor: 1
			});
			x = addClassroomPosition(x);
		}
	}

	buildF();
	
	// REMAINING CLASSROOMS FOR PEINE
	if (n_pabellon === 2 && classrooms_for_peine > 0) {
		let posX = {
			top: (-terrain.width) + (classroom.width * 3),
			middle: (-terrain.width / 2)  + (classroom.width * 3), // (-classroom.width * 2)
			bottom: classroom.length
			// top: 0,
			// middle: terrain.width / 2 - (classroom.width / 2),
			// bottom: terrain.width - (classroom.length + classroom.width)
		}
		
		let posY = 0;
		
		let posZ = {
			top: classroom.length + classroom.width + pasillo,
			middle: classroom.width + pasillo,
			bottom: classroom.width + pasillo
		}

		let side = "top";

		for (let i = 0; i < classrooms_for_peine; i++) {
			classrooms.push({
				position: [posX[side], posY, posZ[side]],
				rotation_classroom: [0, MathUtils.degToRad(side === "top" ? 90 : -90), 0],
				room: ClassroomView,
				floor: 1
			});
			posZ[side] += classroom.length;
			
			side = side === "top" ?  "middle" : (side === "middle" ? "bottom" : "top");
		}

		// let posicion_entrada = ((8)) - 1;
		// classrooms[13].room = EntranceView;
		classrooms[classrooms.length - 4].room = EntranceView;
	}

	

	// HIGH FLOORS
	if (floors_above) {
		const buildFloor = (n) => {
			let x = 0;
			let y = (classroom.height + 11.2) * n;
			let z = 0;
			
			// side 1
			for (let i = 0; i < amountSide1; i++) {
				classrooms.push({
					position: [x, y, z],
					room: ClassroomView,
					floor: n + 1
				});
				x = addClassroomPosition(x);
			}

			// stairs
			if (!!floors_above) {
				x = stairsOffset(x);
				classrooms.push({
					position: [x, y, z],
					room: StairsView,
					n_pabellon: n_pabellon,
					floor: n + 1
				});
				x = addClassroomPosition(x);
			}

			x = bathroomOffset(x);
			// bathroom
			classrooms.push({
				position: [x, y, z],
				room: SSHHView,
				bathroom: bathroom,
				baths: 0,
				have_stairs: !!floors_above,
				floor: n + 1
			});
			x = addClassroomPosition(x);

			// side 2
			for (let i = 0; i < amountSide2; i++) {
				classrooms.push({
					position: [x, y, z],
					room: ClassroomView,
					floor: n + 1
				});
				x = addClassroomPosition(x);
			}
		}

		for (let i = 1; i <= floors_above; i++) {
			buildFloor(i);
			// if (view3DModule === undefined || view3DModule === (i + 1)) buildFloor(i);
		}
	}
	// END SECOND FLOOR


	useEffect(() => {
		var boundingBox = new Box3().setFromObject(pabellon_group.current);
		// const xSize = boundingBox.max.x - boundingBox.min.x;
		// console.log("REAL PABELLON LENGHT", Math.ceil(xSize));
		// let x = position[0] + ((terrain - xSize) / 2);  // esto lo justifica a la esquina
		
		// let x = position[0];
		// let y = position[1];
		// let z = position[2];
		// pabellon_group.current.position.set(x, y, z);
	});

	return (
		<group
			position={position}
			ref={pabellon_group}
		>
			{classrooms.map((el, index) => (
				<el.room
					key={index}
					position={el.position}
					rotation={rotation || el.rotation_classroom} // pab 1 have rotation. rotation_classroom is for peines classrooms.
					classroom={classroom}
					bathroom={bathroom}
					stairs={stairs}
					baths={el.baths}
					increment_scale={increment_scale}
					floor={el.floor}
					have_stairs={el.have_stairs}
					wall_thickness={wall_thickness}
					index={index}
					n_pabellon={n_pabellon}
				/>
			))}
		</group>
	)
}










// import { useEffect, useRef } from "react";
// import { MathUtils, Box3 } from "three";
// import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
// import EntranceView from "../../../../components/EntranceView/EntranceView";
// import SSHHView from "../../../../components/SSHHView/SSHHView";
// import StairsView from "../../../../components/StairsView/StairsView";

// export default function Pabellon({ position, rotation, classroom, bathroom, increment_scale, stairs, n_pabellon, wall_thickness, aforo, levels, floors }) {
// 	let classrooms = [];

// 	const addClassroomPosition = (x) => {
// 		return n_pabellon === 1 ? x + classroom.length : x - classroom.length;
// 	}

// 	const stairsOffset = (x) => {
// 		return n_pabellon === 1 ? x - (classroom.length - 120) : x + (classroom.length - 120);
// 	}

// 	const bathroomOffset = (x) => {
// 		return n_pabellon === 1 ? x - (classroom.length - 334.9999938979745) : x + (classroom.length - 334.9999938979745);
// 	}


	

// 	// const buildLevel = ({ level, n_classrooms }) => {
		
// 	// }
	
// 	const buildFloor = (amountSide1, amountSide2, floor_num, level, put_stairs, baths, index) => {
// 		let x = 0;
// 		let y = (floor_num - 1) * 140;
// 		let z = 0;

// 		// SIDE 1
// 		for (let i = 0; i < amountSide1; i++) {
// 			classrooms.push({
// 				position: [x, y, z],
// 				room: ClassroomView,
// 				floor: floor_num,
// 				level: level.side1.level
// 			});
// 			x = addClassroomPosition(x);
// 		}

// 		// STAIRS
// 		if (put_stairs) {
// 			x = stairsOffset(x);
// 			classrooms.push({
// 				position: [x, y, z],
// 				room: StairsView,
// 				n_pabellon: n_pabellon,
// 				floor: floor_num,
// 				level: level
// 			});
// 			x = addClassroomPosition(x);
// 		}

// 		if (baths) {
// 			// BATHROOM
// 			x = bathroomOffset(x);
// 			classrooms.push({
// 				position: [x, y, z],
// 				room: SSHHView,
// 				bathroom: bathroom,
// 				baths: baths,
// 				floor: floor_num,
// 				level: level
// 			});
// 			x = addClassroomPosition(x);
// 		}

// 		// SIDE 2
// 		for (let i = 0; i < amountSide2; i++) {
// 			classrooms.push({
// 				position: [x, y, z],
// 				room: ClassroomView,
// 				floor: floor_num,
// 				level: level.side2.level
// 			});
// 			x = addClassroomPosition(x);
// 		}
// 	}

// 	console.log({ floors });

// 	floors.forEach(floor => {
// 		buildFloor(floor.side1.amount, floor.side2.amount, floor.num, floor, floor.put_stairs, floor.baths, floor.index);
// 	});

// 	return (
// 		<group
// 			position={position}
// 		>
// 			{classrooms.map((el, index) => (
// 				<el.room
// 					key={index}
// 					position={el.position}
// 					rotation={rotation || el.rotation_classroom} // pab 1 have rotation. rotation_classroom is for peines classrooms.
// 					classroom={classroom}
// 					bathroom={bathroom}
// 					level={el.level}
// 					stairs={stairs}
// 					baths={el.baths}
// 					increment_scale={increment_scale}
// 					floor={el.floor}
// 					have_stairs={el.have_stairs}
// 					wall_thickness={wall_thickness}
// 					index={index}
// 					n_pabellon={n_pabellon}
// 				/>
// 			))}
// 		</group>
// 	)
// }













// COSAS DESECHADAS

	// const addClassroomPosition = (x) => {
	// 	if (n_pabellon === 1) {
	// 		x[index] += classroom.length;
	// 	} else {
	// 		x[index] -= classroom.length;
	// 	}
	// }
	
	// const stairsOffset = (x) => {
	// 	if (n_pabellon === 1) {
	// 		x[index] -= (classroom.length - 120); // 120 es el ancho de las escaleras
	// 	} else {
	// 		x[index] += (classroom.length - 120);
	// 	}
	// }

	// const bathroomOffset = (x) => {
	// 	if (n_pabellon === 1) {
	// 		// x[index] -= (classroom.length - 334.9999938979745) - (!!floors_above ? stairs.width : 0); // 334.9999938979745 es el largo del bathroom
	// 		x[index] -= (classroom.length - 334.9999938979745); // 334.9999938979745 es el largo del bathroom
	// 	} else {
	// 		// x[index] += (classroom.length - 334.9999938979745) - (!!floors_above ? stairs.width : 0); // 334.9999938979745 es el largo del bathroom
	// 		x[index] += (classroom.length - 334.9999938979745); // 334.9999938979745 es el largo del bathroom
	// 	}
	// }




	// TODO ESTO FUE REEMPLZADADO POR UNA FUNCION
		// let x = [0, 0];
		// let y = 0;
		// let z = 0;

		// // side 1
		// for (let i = 0; i < amountSide1; i++) {
		// 	classrooms.push({
		// 		position: [x[index], y, z],
		// 		room: ClassroomView,
		// 		floor: 1
		// 	});
		// 	addClassroomPosition(x);
		// }
		
		// // stairs
		// if (!!floors_above) {
		// 	stairsOffset(x);
		// 	classrooms.push({
		// 		position: [x[index], y, z],
		// 		room: StairsView,
		// 		n_pabellon: n_pabellon,
		// 		floor: 1
		// 	});
		// 	addClassroomPosition(x);
		// }

		// // bathroom
		// bathroomOffset(x);
		// classrooms.push({
		// 	position: [x[index], y, z],
		// 	room: SSHHView,
		// 	bathroom: bathroom,
		// 	baths: baths,
		// 	floor: 1
		// });
		// addClassroomPosition(x);

		// // side 2
		// for (let i = 0; i < amountSide2; i++) {
		// 	classrooms.push({
		// 		position: [x[index], y, z],
		// 		room: ClassroomView,
		// 		floor: 1
		// 	});
		// 	addClassroomPosition(x);
		// }




	// ESTO ES DE LOS PISOS DE ARRIBA
		// const buildFloor = (n) => {
		// 	let x = [0, 0];
		// 	let y = (classroom.height + 11.2) * n;
		// 	let z = 0;
			
		// 	// side 1
		// 	for (let i = 0; i < amountSide1; i++) {
		// 		classrooms.push({
		// 			position: [x[index], y, z],
		// 			room: ClassroomView,
		// 			floor: n + 1
		// 		});
		// 		addClassroomPosition(x);
		// 	}

		// 	// stairs
		// 	if (!!floors_above) {
		// 		stairsOffset(x);
		// 		classrooms.push({
		// 			position: [x[index], y, z],
		// 			room: StairsView,
		// 			n_pabellon: n_pabellon,
		// 			floor: n + 1
		// 		});
		// 		addClassroomPosition(x);
		// 	}

		// 	bathroomOffset(x);
		// 	// bathroom
		// 	classrooms.push({
		// 		position: [x[index], y, z],
		// 		room: SSHHView,
		// 		bathroom: bathroom,
		// 		baths: baths,
		// 		have_stairs: !!floors_above,
		// 		floor: n + 1
		// 	});
		// 	addClassroomPosition(x);

		// 	// side 2
		// 	for (let i = 0; i < amountSide2; i++) {
		// 		classrooms.push({
		// 			position: [x[index], y, z],
		// 			room: ClassroomView,
		// 			floor: n + 1
		// 		});
		// 		addClassroomPosition(x);
		// 	}
		// }