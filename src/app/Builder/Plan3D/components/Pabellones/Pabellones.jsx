import { MathUtils } from "three";
import Pabellon from "./components/Pabellon";

export default function Pabellones({ amount_classrooms, classroom, bathroom, stairs, baths_amount, terrain, increment_scale, wall_thickness }) {
	let pabellones = [];
	let remaining_classrooms = amount_classrooms;
	let pasillo = 2.4 * 50;
	let offset = classroom.length; // offset en el TOP LEFT del pabellon === 1 classroom length

	const computeMaxClassrooms = ({ have_stairs } = { have_stairs: false }) => {
		let buildable_terrain = terrain.width - offset - 336.29999981224523; // 336.29999981224523 is bathroom length
		if (have_stairs) buildable_terrain -= stairs.width;
		return Math.floor(buildable_terrain / classroom.length); // 336.29999981224523 del bathroom y 220 de las escaleras
	}

	// (() => {
		let total_classrooms_length = ((amount_classrooms + 1) * classroom.length) + 336.29999981224523; // +1 es por el offset.  // 336.29999981224523 is bathroom length
		let amount_pabellones = total_classrooms_length < terrain.width ? 1 : 2;
		
		let pab = {
			1: { // (classroom.length * 2) es el offset en la parte superior del pabellon.
				x: -terrain.width / 2 + (classroom.length * 2),
				y: 0,
				z: terrain.width / 2,
				rotation: [0, MathUtils.degToRad(-180), 0],
				max_classrooms: computeMaxClassrooms(),
				baths: baths_amount.pab1
			},
			2: { // (classroom.length) es el offset en la parte superior del pabellon. NOTE: No se multiplica x2 porque este pabellon no ha sido rotado como el primero.
				// x: -terrain.width / 2 + (classroom.length),
				x: terrain.width / 2 - (classroom.length * 1.5), // 1.5 es para que sea el (largo + (largo / 2))  |  2
				y: 0,
				z: -terrain.width / 2,
				max_classrooms: computeMaxClassrooms(),
				baths: baths_amount.pab2
			}
		}

		// Formula: Tl - 2(p + Cw) / Cl
		let max_classrooms_peine = Math.floor((terrain.width - (2 * (pasillo + classroom.width))) / classroom.length);
		// Formula: (MaxClassroomsP1 + MaxClassroomsP2 + 3 * MaxClassroomsPeine) - 1  
		let max_classroom_for_floor = pab[1].max_classrooms + pab[2].max_classrooms + (3 * max_classrooms_peine) - 1;

		// if (amount_classrooms > max_classroom_for_floor) {
		// 	pab[1].max_classrooms = computeMaxClassrooms({ have_stairs: true });
		// 	pab[1].have_stairs = true;
		// }

		console.log({max_classrooms_peine})
		console.log({max_classroom_for_floor});

		console.log("max classrooms first pabellon:", pab[1].max_classrooms);
		console.log("max classrooms second pabellon:", pab[2].max_classrooms);
		
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
	// })();

	return (
		pabellones.map((el, index) => (
			<Pabellon
				key={index}
				position={el.position}
				rotation={el.rotation}
				amount_classrooms={amount_classrooms}
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
				max_classrooms={pab[2].max_classrooms}
			/>
		))
	)
}
