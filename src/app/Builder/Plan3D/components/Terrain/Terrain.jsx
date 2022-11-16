import { Color } from "three";

export default function Terrain({ width, length }) {
	return (
		<mesh
			position={[0, -0.200006105005 - 1.2, 0]} // + 0.01 es para que no haya parpadeo (en realidad no se si sirva (perfection))
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		>
			<planeGeometry
				args={[width, length]}
			/>
			{/* use "meshPhongMaterial" for easy illumination */}
			<meshBasicMaterial
				color={new Color(0x838383)}
				specular={0x111111}
			/>
		</mesh>
	)
}
