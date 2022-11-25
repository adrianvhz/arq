import { MathUtils } from "three";
import Pabellon from "./components/Pabellon";

export default function Pabellones({ amount_classrooms, classroom, bathroom, stairs, baths_amount, data, terrain, increment_scale, wall_thickness }) {
	let pabellones = [];
	let remaining_classrooms = amount_classrooms;
	let pasillo = 2.4 * 50;
	let offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length

	// maximo numero de aulas por el largo del terreno
	const computeMaxClassrooms = ({ have_bathroom, have_stairs } = {}) => {
		let buildable_terrain = terrain.width - offset;
		if (have_bathroom) buildable_terrain -= 334.9999938979745; // 334.9999938979745 is bathroom length
		if (have_stairs) buildable_terrain -= stairs.width;
		return Math.floor(buildable_terrain / classroom.length);
	}

	// +1 es por el offset.
	let total_classrooms_length = ((amount_classrooms + 1) * classroom.length) + 334.9999938979745; // 334.9999938979745 is bathroom length
	let amount_pabellones = total_classrooms_length < terrain.width ? 1 : 2;

	let pab = {
		1: { // (classroom.length * 2) es el offset en la parte superior del pabellon.
			x: -terrain.width / 2 + (classroom.length * 2),
			y: 0,
			z: terrain.width / 2,
			rotation: [0, MathUtils.degToRad(-180), 0],
			baths: baths_amount.pab1,
			max_classrooms: computeMaxClassrooms({ have_bathroom: true, have_stairs: false })
		},
		2: { // (classroom.length) es el offset en la parte superior del pabellon. NOTE: No se multiplica x2 porque este pabellon no ha sido rotado como el primero.
			// x: -terrain.width / 2 + (classroom.length),
			x: terrain.width / 2 - (classroom.length * 1.5), // 1.5 es para que sea el (largo + (largo / 2))  |  2
			y: 0,
			z: -terrain.width / 2,
			baths: baths_amount.pab2,
			max_classrooms: computeMaxClassrooms({ have_bathroom: (baths_amount.pab2 > 0), have_stairs: false })
		}
	}	

	// Formula: Tl - 2(p + Cw) / Cl
	let max_classrooms_peine = Math.floor((terrain.width - (2 * (pasillo + classroom.width))) / classroom.length);
	// Formula: (MaxClassroomsP1 + MaxClassroomsP2 + 3 * MaxClassroomsPeine) - 1  
	let max_classrooms_first_floor = pab[1].max_classrooms + pab[2].max_classrooms + (3 * max_classrooms_peine) - 1;


	// Si hay mas aulas que maximo de aulas por primer piso, entonces se volvera a calcular el max_classrooms por pabellon.
	if (amount_classrooms > max_classrooms_first_floor) {
		pab[1].max_classrooms = computeMaxClassrooms({ have_bathroom: true, have_stairs: true });
		if (max_classrooms_first_floor + pab[1].max_classrooms) {
			pab[2].max_classrooms = computeMaxClassrooms({ have_bathroom: (baths_amount.pab2 > 0), have_stairs: true });
		}
	}

	console.log({max_classrooms_peine, max_classroom_first_floor: max_classrooms_first_floor});
	console.log({"max classrooms first pabellon:": pab[1].max_classrooms, "max classrooms second pabellon:": pab[2].max_classrooms});

	



	let remaining_first_floor = max_classrooms_first_floor;

	let classrooms = [];
	let aula_index = 0;

	for (let level of data.levels) {
		for (let i = 0; i < data.aulas[level]; i++) {
			classrooms.push({
				aula_index: aula_index,
				aula_level_index: i,
				level: level,
				pab: aula_index < pab[1].max_classrooms ? 1 : (aula_index > max_classrooms_first_floor && aula_index < max_classrooms_first_floor + pab[2].max_classrooms + 1 ? 1 : 2),
				floor: aula_index < max_classrooms_first_floor ? 1 : aula_index < (max_classrooms_first_floor + pab[1].max_classrooms) ? 2 : 3 
			});
			aula_index++;
		}
	}

	// console.log(classrooms.map(el => ({pab: el.pab, floor: el.floor})))
	console.log(classrooms)





	// START CLASS
	// Se uso una clase porque las propiedades necesitan de sus datos entre si.
	class AmountsPab {
		constructor(p) {
			this.side1;
			this.side2;
			p === 1 ? this.forPab1() : this.forPab2();
		}

		forPab1() {
			this.side1 = Math.ceil(pab[1].max_classrooms / 2);
			this.side2 = pab[1].max_classrooms - this.side1;

			remaining_classrooms -= pab[1].max_classrooms;
		}

		forPab2() {
			let b = remaining_classrooms <= pab[2].max_classrooms ? remaining_classrooms : pab[2].max_classrooms;
			this.side1 = Math.ceil(b / 2);
			this.side2 = b - this.side1;
			
			remaining_classrooms -= this.side1 + this.side2;
		}
	}
	// END CLASS





	// PUSH PABELLONES
	for (let p = 1; p <= amount_pabellones; p++) {
		let topSide;
		let bottomSide;

		// 1 PABELLON
		if (amount_pabellones === 1) {
			topSide = Math.ceil(remaining_classrooms / 2);
			bottomSide = remaining_classrooms - topSide;

			remaining_classrooms = 0;
		}

		// 2 PABELLONES
		else {
			let amountsPab = new AmountsPab(p);

			topSide = amountsPab.side1;
			bottomSide = amountsPab.side2;
		}
		
		pabellones.push({
			position: [pab[p].x, pab[p].y, pab[p].z],
			rotation: pab[p].rotation,
			amountSide1: topSide,
			amountSide2: bottomSide,
			baths: pab[p].baths,
			// have_stairs: pab[p].have_stairs
		});

		// remaining_classrooms -= max_classrooms_per_pabellon;
	}

	let totalSidesPeine = max_classrooms_peine * 3;
	let classrooms_for_peine;

	if (remaining_classrooms > totalSidesPeine) {
		classrooms_for_peine = totalSidesPeine;
		remaining_classrooms -= totalSidesPeine;
	} else {
		classrooms_for_peine = remaining_classrooms;
		remaining_classrooms = 0;
	}

	console.log("remaining classrooms for second floor", remaining_classrooms);

	if (remaining_classrooms > 0) {
		let amount_high_floors = Math.ceil(remaining_classrooms / pab[1].max_classrooms);
		pab[1].floors_above = Math.ceil(amount_high_floors / 2);
		pab[2].floors_above = amount_high_floors - pab[1].floors_above;
	}

	return (
		pabellones.map((el, index) => (
			<Pabellon
				key={index}
				position={el.position}
				rotation={el.rotation}
				amountSide1={el.amountSide1}
				amountSide2={el.amountSide2}
				classroom={classroom}
				bathroom={bathroom}
				stairs={stairs}
				increment_scale={increment_scale}
				terrain={terrain}
				classrooms_for_peine={classrooms_for_peine}
				floors_above={pab[index + 1].floors_above}
				index={index}
				baths={el.baths}
				pasillo={pasillo}
				wall_thickness={wall_thickness}
			/>
		))
	)
}






// import { MathUtils } from "three";
// import Pabellon from "./components/Pabellon";

// export default function Pabellones({ amount_classrooms, classroom, bathroom, stairs, baths_amount, terrain, aulas, aforo, levels, zone, type, increment_scale, wall_thickness }) {
// 	let pabellones = [];
// 	let remaining_classrooms = amount_classrooms;
// 	let pasillo = 2.4 * 50;
// 	let offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length

// 	// maximo numero de aulas por el largo del terreno
// 	const computeMaxClassrooms = ({ have_bathroom, have_stairs } = {}) => {
// 		let buildable_terrain = terrain.width - offset;
// 		if (have_bathroom) buildable_terrain -= 334.9999938979745; // 334.9999938979745 is bathroom length
// 		if (have_stairs) buildable_terrain -= stairs.width;
// 		return Math.floor(buildable_terrain / classroom.length);
// 	}

// 	console.log(computeMaxClassrooms());
// 	console.log(computeMaxClassrooms({ have_bathroom: true }));
// 	console.log(computeMaxClassrooms({ have_stairs: true }));
// 	console.log(computeMaxClassrooms({ have_bathroom: true, have_stairs: true }));
	
// 	let pab = {
// 		1: { // (classroom.length * 2) es el offset en la parte superior del pabellon.
// 			x: -terrain.width / 2 + (classroom.length * 2),
// 			y: 0,
// 			z: terrain.width / 2,
// 			rotation: [0, MathUtils.degToRad(-180), 0],
// 			n_pabellon: 1,
// 			max_classrooms: computeMaxClassrooms({ have_stairs: false }),
// 			baths: baths_amount.pab1,
// 			floors: []
// 		},
// 		2: { // (classroom.length) es el offset en la parte superior del pabellon. NOTE: No se multiplica x2 porque este pabellon no ha sido rotado como el primero.
// 			// x: -terrain.width / 2 + (classroom.length),
// 			x: terrain.width / 2 - (classroom.length * 1.5), // 1.5 es para que sea el (largo + (largo / 2))  |  2
// 			y: 0,
// 			z: -terrain.width / 2,
// 			n_pabellon: 2,
// 			max_classrooms: computeMaxClassrooms({ have_stairs: false }),
// 			baths: baths_amount.pab2,
// 			floors: []
// 		}
// 	}

// 	let classrooms = [];

// 	// levels.forEach(level => {
// 	// 	for (let i = 0; i < aulas[level]; i++) {
// 	// 		classrooms.push({
// 	// 			level: level
// 	// 		});
// 	// 	}
// 	// });

// 	// console.log(classrooms);

// 	let pabs_data = {
// 		1: {
// 			floor1: {
// 				inicial: 3,
// 				baths: 4,
// 				primaria: 2,
// 				// put_stairs:
// 			},
// 			floor2: {
// 				primaria: 6
// 			}
// 		},
// 		2: {
// 			floor1: {
// 				primaria: 3,
// 				baths: 6,
// 				secundaria: 2
// 			},
// 			floor2: {
// 				secundaria: 3
// 			}
// 		}
// 	}


// 	pab[1].floors.push({
// 		num: 1,
// 		side1: {
// 			amount: 3,
// 			level: "inicial"
// 		},
// 		side2: {
// 			amount: 2,
// 			level: "primaria"
// 		},
// 		put_stairs: true,
// 		baths: 4,
// 		index: 0
// 	});

// 	pab[1].floors.push({
// 		num: 2,
// 		side1: {
// 			amount: 6,
// 			level: "primaria"
// 		},
// 		side2: {
// 			amount: 0
// 		},
// 		index: 0
// 	});

// 	pab[2].floors.push({
// 		num: 1,
// 		side1: {
// 			amount: 3,
// 			level: "primaria"
// 		},
// 		side2: {
// 			amount: 2,
// 			level: "secundaria"
// 		},
// 		put_stairs: true,
// 		baths: 6,
// 		index: 1
// 	});

// 	pab[2].floors.push({
// 		num: 2,
// 		side1: {
// 			amount: 3,
// 			level: "secundaria"
// 		},
// 		side2: {
// 			amount: 0
// 		},
// 		index: 1
// 	});


// 	// push pabellones
// 	for (let p = 1; p <= 2; p++) {
// 		pabellones.push({
// 			position: [pab[p].x, pab[p].y, pab[p].z],
// 			rotation: pab[p].rotation,
// 			floors: pab[p].floors,
// 			n_pabellon: pab[p].n_pabellon
// 		});
// 	}

// 	return pabellones.map((el, index) => (
// 		<Pabellon
// 			key={index}
// 			position={el.position}
// 			rotation={el.rotation}
// 			floors={el.floors}
// 			n_pabellon={el.n_pabellon}
// 			classroom={classroom}
// 			bathroom={bathroom}
// 			wall_thickness={wall_thickness}
// 			increment_scale={increment_scale}
// 			terrain={terrain}
// 			pasillo={pasillo}
// 			stairs={stairs}
// 		/>
// 	))
// }
