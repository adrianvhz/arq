import { Shape, Color } from "three";

export default function SoccerField2D({ terrain, amount_classrooms, classroom, soccer_field, increment_scale }) {
	let z = 0;

	let half_width = soccer_field.width / 2;
	let half_length = soccer_field.length / 2;

	let shape = new Shape();
	shape.moveTo(-half_length, -half_width);
	shape.lineTo(half_length, -half_width);
	shape.lineTo(half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.lineTo(-half_length, half_width);
	shape.closePath();

	return (
		<group
			position={[-terrain.width / 7.5, 0, z]} // x = (-terrain.width / 2) + (LENGTH / 2) + classroom.length
			rotation={[-Math.PI / 2, 0, Math.PI / 2]}
		>
			<mesh
			>
				<planeGeometry
					args={[soccer_field.length, soccer_field.width]}
				/>
				<meshStandardMaterial
					color={new Color("gray")}
				/>
			</mesh>

			<line
			>
				<shapeGeometry args={[shape]} />
				<lineBasicMaterial
					color="black"
				/>
			</line>
		</group>
	)
}
