import { useEffect } from "react";
import { useRef } from "react";
import { BackSide, DoubleSide, FrontSide, MathUtils, Box3 } from "three";

export default function Step({ position, flight }) {
	let { width, riser, tread } = flight;

	let step = useRef(null);

	useEffect(() => {
		// var boundingBox = new Box3().setFromObject(step.current);
		// const xSize = boundingBox.max.x - boundingBox.min.x;
		// console.log({xSize}, "escalon largo")
	})

	return (
		<mesh
			ref={step}
			position={position}
		>
			<boxGeometry args={[width, riser, tread]} />
			<meshStandardMaterial shadowSide={BackSide} side={DoubleSide} />
		</mesh>
	)
}
