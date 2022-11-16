import BathGroup from "./BathGroup";

export default function Bathroom({ amount, bathroom, increment_scale, wall_thickness }) {
	let separacion_cubiculos = 0.5; // ligera separacion entre las paredes de los cubiculos, compensacion

	let baths_group = [
		{
			first: true,
			position: [0, 0, 0]
		}
	];

	if (amount > 1) {
		let z = -bathroom.ancho_de_cubiculo - wall_thickness;

		for (let i = 1; i < amount; i++) {
			baths_group.push({
				position: [0, 0, z]
			});
			z -= bathroom.ancho_de_cubiculo + wall_thickness;
		}
	}
	
	return (
		<group
			position={[-bathroom.pasillo_de_entrada / 2 - separacion_cubiculos, 0, -bathroom.pasillo_de_entrada - wall_thickness]}
		>
			<group>
				{baths_group.map((cubiculo, index) => (
					<BathGroup
						key={index}
						position={cubiculo.position}
						first={cubiculo.first}
						increment_scale={increment_scale}
						wall_thickness={wall_thickness}
						bathroom={bathroom}
						separacion_cubiculos={separacion_cubiculos}
					/>
				))}
			</group>
		</group>
	)
}
