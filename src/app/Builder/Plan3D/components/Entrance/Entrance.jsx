import Roof from "../ClassroomGroup/components/Roof";

export default function Entrance({ position, rotation, classroom }) {
	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<Roof
				position={[0, classroom.height + classroom.bigas.horizontal.height, 0]}
				classroom={classroom}
				extraRoff={50}
			/>
		</object3D>
	)
}
