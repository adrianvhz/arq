import Roof from "../ClassroomGroup/components/Roof";

export default function Entrance({ position, rotation, classroom }) {
	return (
		<object3D
			position={position}
			rotation={rotation}
		>
			<Roof classroom={classroom} />
		</object3D>
	)
}
