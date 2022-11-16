import { useEffect } from "react";
import { useRef } from "react";
import { Color, DoubleSide } from "three";

export default function Pasillo({ args, position, rotation, color }) {
	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			<planeGeometry
				args={args}
			/>
			<meshStandardMaterial
				color={new Color(color)}
			/>
		</mesh>
	)
}
