import { Color, DoubleSide } from "three";

export default function Landing({ position, landing }) {
	return (
		<mesh
			position={position}
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<planeGeometry args={[landing.length, landing.width]} />
			<meshStandardMaterial color={new Color(0xf0ede9)} side={DoubleSide} />
		</mesh>
	)
}
