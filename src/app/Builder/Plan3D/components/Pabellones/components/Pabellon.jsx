import { useEffect, useRef } from "react";
import { DoubleSide, BackSide, MathUtils, Vector3, Box3 } from "three";
import ClassroomView from "../../../../components/ClassroomView/ClassroomView";
import SSHHView from "../../../../components/SSHHView/SSHHView";

export default function Pabellon({ amount_classrooms, position, rotation, amountSide1, amountSide2, classroom, bathroom, increment_scale, terrain_width, remaining_classrooms_, baths, stairs, index, wall_thickness }) {
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
			x[index] -= (classroom.length - 336.29999981224523) - (stairs ? 120 : 0); // 336.29999981224523 es el largo del bathroom
		} else {
			x[index] += (classroom.length - 336.29999981224523) - (stairs ? 120 : 0); // 336.29999981224523 es el largo del bathroom
		}
	}

	let x = [0, 0];
	let y = 0;
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
			stairs: stairs
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



	
	// REMAINING CLASSROOMS FOR PEINE
	let remaining_classrooms = remaining_classrooms_;
	
	if (n_pabellon === 2) {
		let posX = {
			top: (-terrain_width) + (classroom.width * 3),
			middle: (-terrain_width / 2)  + (classroom.width * 3), // (-classroom.width * 2)
			bottom: classroom.length
			// top: 0,
			// middle: terrain_width / 2 - (classroom.width / 2),
			// bottom: terrain_width - (classroom.length + classroom.width)
		}
		
		let posY = 0;
		
		let posZ = {
			top: classroom.length + classroom.width + (2.4 * increment_scale),
			middle: classroom.width + (2.4 * increment_scale),
			bottom: classroom.width + (2.4 * increment_scale)
		}

		let side = "top";

		let o = amount_classrooms === 30 ? 15 : remaining_classrooms;
		for (let i = 0; i < o; i++) {
			classrooms.push({
				position: [posX[side], posY, posZ[side]],
				rotation_classroom: [0, MathUtils.degToRad(side === "top" ? 90 : -90), 0],
				room: ClassroomView
			});
			posZ[side] += classroom.length;
			
			side = side === "top" ?  "middle" : (side === "middle" ? "bottom" : "top");
			remaining_classrooms--;
		}
	}
	
	// console.log("asdad", remaining_classrooms > 0);

	// SECOND FLOOR
	if (n_pabellon === 1 && remaining_classrooms === -1) {
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
		
		let x = [0, 0];
		let y = classroom.height + 20;
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
				baths: baths
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
					baths={el.baths}
					increment_scale={increment_scale}
					stairs={el.stairs}
					wall_thickness={wall_thickness}
					index={index}
					n_pabellon={n_pabellon}
				/>
			))}
		</group>
	)
}
