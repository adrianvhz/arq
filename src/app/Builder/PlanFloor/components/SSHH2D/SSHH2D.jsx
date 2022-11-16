import { Shape } from "three";
import { Text } from "@react-three/drei";
import InterBold from "../../../../../assets/font/Inter-Bold.woff";

export default function SSHH2D({ position, rotation, bathroom, baths, stairs, wall_thickness, increment_scale, n_pabellon }) {
	const createSquareShape = (width, length) => {
		let squareShape = new Shape();
		squareShape.moveTo(0, 0);
		squareShape.lineTo(0, width - wall_thickness);
		squareShape.lineTo(length - wall_thickness, width - wall_thickness);
		squareShape.lineTo(length - wall_thickness, 0);
		squareShape.closePath();
		return squareShape;
	}

	return (
		<group
			position={position}
			rotation={rotation}
		>
			<line
				position={[8, 0, ((baths * bathroom.ancho_de_cubiculo) + ((wall_thickness + 0.200006105005) * (baths + 1)) + bathroom.pasillo_de_entrada + 0.200006105005)]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[createSquareShape(((baths * bathroom.ancho_de_cubiculo) + ((wall_thickness + 0.200006105005) * (baths + 1)) + bathroom.pasillo_de_entrada + 0.200006105005), (bathroom.lavamanos + bathroom.pasillo + bathroom.inodoro) * 2)]}
				/>
				<lineBasicMaterial
					color={0x383838}
				/>
			</line>

			<mesh
				position={[9, 0, ((baths * bathroom.ancho_de_cubiculo) + ((wall_thickness + 0.200006105005) * (baths + 1)) + bathroom.pasillo_de_entrada + 0.200006105005) - 1]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<shapeGeometry
					args={[createSquareShape(((baths * bathroom.ancho_de_cubiculo) + ((wall_thickness + 0.200006105005) * (baths + 1)) + bathroom.pasillo_de_entrada + 0.200006105005) - 2, ((bathroom.lavamanos + bathroom.pasillo + bathroom.inodoro) * 2) - 2)]}
				/>
				<meshBasicMaterial
					color={0x4e5a65}
				/>
			</mesh>

			<Text
				position={[170, 1, 180]}
				rotation={[-Math.PI / 2, 0, n_pabellon === 1 ? -Math.PI / 2 : Math.PI / 2]}
				color="black"
				font={InterBold}
				anchorX="center"
				anchorY="middle"
				fontSize={100}
				children={"SSHH"}
			/>
		</group>
	)
}
