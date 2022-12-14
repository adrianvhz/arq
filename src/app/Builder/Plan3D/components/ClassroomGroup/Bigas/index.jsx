export default function Bigas({ classroom }) {
	const offset = 7.5; // 15

	const pos = {
		horizontal: {
			x: classroom.length / 2,
			y: classroom.height + (0.30 * 50),
			z: 1
		},
		vertical: {
			x: 1,
			y: classroom.height + (0.40 * 50),
			z: classroom.width / 2
		}
	}

	const { bigas } = classroom;

	const oBigas = [
		// HORIZONTALES
		{
			id: 0,
			position: [pos.horizontal.x, pos.horizontal.y, offset],
			rotation: [0, Math.PI / 2, 0],
			width: bigas.horizontal.width,
			height: bigas.horizontal.height,
			length: classroom.length
		},
		{
			id: 1,
			position: [pos.horizontal.x, pos.horizontal.y, classroom.width - offset],
			rotation: [0, Math.PI / 2, 0],
			width: bigas.horizontal.width,
			height: bigas.horizontal.height,
			length: classroom.length
		},

		// VERTICALES
		{
			id: 2,
			position: [offset, pos.vertical.y, pos.vertical.z],
			rotation: [0, 0, 0],
			width: bigas.vertical.width,
			height: bigas.vertical.height,
			length: classroom.width
		},
		{
			id: 3,
			position: [classroom.length / 2, pos.vertical.y, pos.vertical.z],
			rotation: [0, 0, 0],
			width: bigas.vertical.width,
			height: bigas.vertical.height,
			length: classroom.width
		},
		{
			id: 4,
			position: [classroom.length - offset, pos.vertical.y, pos.vertical.z],
			rotation: [0, 0, 0],
			width: bigas.vertical.width,
			height: bigas.vertical.height,
			length: classroom.width
		}
	]
	return (
		oBigas.map(el => (
			<Biga
				key={el.id}
				position={el.position}
				rotation={el.rotation}
				width={el.width}
				height={el.height}
				length={el.length}
			/>
		))
	)
}


function Biga({ width, height, length, position, rotation }) {
	return (
		<mesh position={position} rotation={rotation}>
			<boxGeometry args={[width, height, length]} />
			<meshStandardMaterial color={"gray"} />
		</mesh>
	)
}
