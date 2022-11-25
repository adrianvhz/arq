import CubiculoWall from "./CubiculoWall";
import SeparacionWall from "./SeparacionWall";
import Lavamanos from "./Lavamanos";

export default function BathGroup({ position, bathroom, increment_scale, first, wall_thickness, separacion_cubiculos }) {
	// let common_z = (bathroom.lavamanos / 2) + wall_thickness + (bathroom.ancho_de_cubiculo - bathroom.lavamanos) / 2;
	let common_z = -bathroom.ancho_de_cubiculo / 2;

	let lavamanos_pos = {
		left: [
			// (-bathroom.lavamanos / 2) - bathroom.pasillo - bathroom.inodoro,
			(-bathroom.lavamanos / 2),
			0,
			common_z
		],
		rigth: [
			(bathroom.lavamanos / 2) + bathroom.pasillo + bathroom.inodoro + 0.5,
			0,
			common_z
		]
	}

	return (
		<group position={position}>
			{first && (
				<CubiculoWall
					position={[0, 0, 0]}
					bathroom={bathroom}
					separacion_cubiculos={separacion_cubiculos}
					wall_thickness={wall_thickness}
				/>
			)}
			
			<CubiculoWall
				// position={[0, 0, -bathroom.ancho_de_cubiculo - wall_thickness]}
				position={[0, 0, 50]}
				bathroom={bathroom}
				separacion_cubiculos={separacion_cubiculos}
				wall_thickness={wall_thickness}
			/>

			<SeparacionWall
				position={[74, 0, 7.5]}
				rotation={[0, -Math.PI / 2, 0]}
				bathroom={bathroom}
				wall_thickness={wall_thickness}
				increment_scale={increment_scale}
			/>

			<Lavamanos
				position={lavamanos_pos.left}
				bathroom={bathroom}
			/>
			
			<Lavamanos
				position={lavamanos_pos.rigth}
				bathroom={bathroom}
			/>
		</group>
	)
}