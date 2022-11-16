import { MathUtils } from "three";
import Pabellon from "./components/Pabellon";

export default function Pabellones({ amount_classrooms, classroom, bathroom, baths_amount, terrain_width, increment_scale, wall_thickness }) {
	let pabellones = [];
	let remaining_classrooms = amount_classrooms;

	const computeMaxClassrooms = ({ stairs } = { stairs: false }) => {
		let buildable_terrain = terrain_width - 336.29999981224523; // 336.29999981224523 is bathroom length
		if (stairs) buildable_terrain -= 120;
		return (Math.floor(buildable_terrain / classroom.length)) - 1; // ese - 1 indica el offset en el TOP LEFT === 1 classroom de offset | 336.29999981224523 del bathroom y 220 de las escaleras
	}

	(() => {
		let total_classrooms_length = ((amount_classrooms + 1) * classroom.length) + 336.29999981224523; // +1 es por el offset.  // 336.29999981224523 is bathroom length
		let amount_pabellones = total_classrooms_length < terrain_width ? 1 : 2;
		
		let pab = {
			1: { // (classroom.length * 2) es el offset en la parte superior del pabellon.
				x: -terrain_width / 2 + (classroom.length * 2),
				y: 0,
				z: terrain_width / 2,
				rotation: [0, MathUtils.degToRad(-180), 0],
				max_classrooms: computeMaxClassrooms(),
				baths: baths_amount.pab1
			},
			2: { // (classroom.length) es el offset en la parte superior del pabellon. NOTE: No se multiplica x2 porque este pabellon no ha sido rotado como el primero.
				// x: -terrain_width / 2 + (classroom.length),
				x: terrain_width / 2 - (classroom.length * 1.5), // 1.5 es para que sea el (largo + (largo / 2))  |  2
				y: 0,
				z: -terrain_width / 2,
				max_classrooms: computeMaxClassrooms(),
				baths: baths_amount.pab2
			}
		}
		
		let max_classrooms_peine = Math.floor((terrain_width - (2 * ((2.4 * 50) + classroom.width))) / classroom.length);

		let max_classroom_for_floor = pab[1].max_classrooms + pab[2].max_classrooms + (3 * max_classrooms_peine) - 1;

		if (amount_classrooms > max_classroom_for_floor) {
			pab[1].max_classrooms = computeMaxClassrooms({ stairs: true });
			pab[1].stairs = true;
		}

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
				stairs: pab[p].stairs
			});

			// remaining_classrooms -= max_classrooms_per_pabellon;
		}

		console.log("remaining classrooms for peine", remaining_classrooms);
	})();

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
				increment_scale={increment_scale}
				terrain_width={terrain_width}
				remaining_classrooms_={remaining_classrooms}
				index={index}
				baths={el.baths}
				stairs={el.stairs}
				wall_thickness={wall_thickness}
			/>
		))
	)
}
