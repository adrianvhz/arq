import { Color, DoubleSide, Shape } from "three";

export default function EntranceGeometry() {
	let width = 50;
	let length = 100;

	const shape = new Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, length);
	shape.lineTo(width, length);
	shape.lineTo(width, 0);
    shape.lineTo(0, 0);

	return (
		<extrudeGeometry args={[shape, { depth: 8 }]} />
	)
}
