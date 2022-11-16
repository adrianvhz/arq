import { Color, Shape } from "three";

export default function SoccerField({ terrain, amount_classrooms, classroom, soccer_field, increment_scale }) {
	var z = 0;

	if (amount_classrooms <= 5) {
		// z = (terrain.width / 2) - (WIDTH / 2) - classroom.width - (1.80 * increment_scale);
	} else {
		// z = (terrain.width / 2) - (WIDTH / 2) - classroom.width - (2.40 * increment_scale);
	}

	return (
		<mesh
			position={[-terrain.width / 7.5, 0, z]}  // x = (-terrain.width / 2) + (LENGTH / 2) + classroom.length
			rotation={[-Math.PI / 2, 0, Math.PI / 2]}
		>
			<planeGeometry
				args={[soccer_field.length, soccer_field.width]}
			/>
			<meshStandardMaterial
				color={new Color("gray")}
			/>
		</mesh>
	)
}
