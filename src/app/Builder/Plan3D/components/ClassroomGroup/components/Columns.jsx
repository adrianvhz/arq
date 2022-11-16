import Column from "./Column";

export default function Columns({ classroom, wall_thickness, increment_scale }) {
	let xPos = {
		1: 7.7,
		2: (classroom.length / 2) - wall_thickness,
		3: classroom.length - 20,
	}
	let yPos = -0.5;
	let zPosFront = classroom.width - wall_thickness - 0.4; // VERTICAL
	let zPosBack = 20.2; // VERTICAL

	let columns = [  // x = horizontal | z = vertical
		[xPos[1], yPos, zPosFront], // front-LEFT column
		[xPos[2], yPos, zPosFront], // front-MIDDLE column
		[xPos[3], yPos, zPosFront], // front-RIGHT column

		[xPos[1], yPos, zPosBack], // back-RIGHT column
		[xPos[2], yPos, zPosBack], // back-MIDDLE column
		[xPos[3], yPos, zPosBack], // back-LEFT column
	];
	
	return (
		columns.map((column, index) => (
			<Column
				key={index}
				position={column}
				classroom_height={classroom.height}
				increment_scale={increment_scale}
			/>
		))
	)
}
