import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DoubleSide, MathUtils, Box3 } from "three";
import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
import EntranceView from "../../../../components/EntranceView/EntranceView";
import SSHHView from "../../../../components/SSHHView/SSHHView";

export default function Pabellon({ amount_classrooms, position, rotation, amountSide1, amountSide2, classroom, bathroom, increment_scale, pasillo, terrain, classrooms_for_peine, floors_above, baths, stairs, index, wall_thickness, max_classrooms }) {
	let view3DModule = useSelector(state => state.building.view3DModule);

	let pabellon_group = useRef(null);
	let n_pabellon = index + 1;

	let classrooms = [];
	
	const addPosition = (x) => {
		if (index === 0) {
			x[index] += classroom.length;
		} else {
			x[index] -= classroom.length;
		}
	}

	const bathroomOffset = (x) => {
		if (n_pabellon === 1) {
			// x[index] -= (classroom.length - 336.29999981224523) - (have_stairs ? 120 : 0); // 336.29999981224523 es el largo del bathroom
			x[index] -= (classroom.length - 336.29999981224523) - (!!floors_above ? stairs.width : 0); // 336.29999981224523 es el largo del bathroom
		} else {
			x[index] += (classroom.length - 336.29999981224523) - (!!floors_above ? stairs.width : 0); // 336.29999981224523 es el largo del bathroom
		}
	}

	let x = [0, 0];
	let y = 0;
	let z = 0;
	
	// side 1
	for (let i = 0; i < amountSide1; i++) {
		classrooms.push({
			position: [x[index], y, z],
			room: ClassroomView,
			floor: 1
		});
		addPosition(x);
	}

	bathroomOffset(x);

	// bathrooms
	for (let i = 0; i < 1; i++) {
		classrooms.push({
			position: [x[index], y, z],
			room: SSHHView,
			bathroom: bathroom,
			baths: baths,
			have_stairs: !!floors_above
		});
		addPosition(x);
	}

	// side 2
	for (let i = 0; i < amountSide2; i++) {
		classrooms.push({
			position: [x[index], y, z],
			room: ClassroomView,
			floor: 1
		});
		addPosition(x);
	}



	
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

		classrooms[max_classrooms + 7].room = EntranceView;
	}
	if (n_pabellon === 2) {
		classrooms.forEach((el, index) => console.log(el.room.name, index))
	}
	
	// SECOND FLOOR
	if (floors_above) {
		// -------------------------

		// let x = 0; // classroom.length // si se quiere el 2do pabellon
		// let y = classroom.height + 20;
		// let z = 0; // z = terrain // si se quiere el 2do pabellon

		// // for (let i = 0; i < remaining_classrooms; i++) {
		// for (let i = 0; i < 5; i++) {
		// 	classrooms.push({
		// 		position: [x, y, z],
		// 		room: <ClassroomView />
		// 		// rotation: [0, MathUtils.degToRad(-180), 0] // Si se quiere el 2do pabellon
		// 	});
		// 	x += classroom.length;
		// }

		// -------------------------

		const buildFloor = (i) => {
			let x = [0, 0];
			let y = (classroom.height + 20) * i;
			let z = 0;
			
			// side 1
			for (let i = 0; i < amountSide1; i++) {
				classrooms.push({
					position: [x[index], y, z],
					room: ClassroomView
				});
				addPosition(x);
			}

			bathroomOffset(x);

			// bathrooms
			for (let i = 0; i < 1; i++) {
				classrooms.push({
					position: [x[index], y, z],
					room: SSHHView,
					bathroom: bathroom,
					baths: baths,
					have_stairs: !!floors_above
				});
				addPosition(x);
			}

			// side 2
			for (let i = 0; i < amountSide2; i++) {
				classrooms.push({
					position: [x[index], y, z],
					room: ClassroomView
				});
				addPosition(x);
			}
		}

		for (let i = 1; i <= floors_above; i++) {
			if (view3DModule === undefined || view3DModule === (i + 1)) buildFloor(i);
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
