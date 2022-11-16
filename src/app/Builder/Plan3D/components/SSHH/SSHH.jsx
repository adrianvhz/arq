import { useEffect, useRef } from "react";
import { Box3, DoubleSide } from "three";
import WallSSHH from "./components/WallSSHH";
import Bathroom from "./components/Bathroom";
import Pasillo from "./components/Pasillo";
import Stairs from "../Stairs/Stairs";
import WallsClass from "./components/WallsClass";

export default function SSHH({ position, rotation, bathroom, baths, stairs, wall_thickness, increment_scale, n_pabellon }) {
	// 1 compensacion de pared grosor en paralelo

	const { pasillo, inodoro, pasillo_de_entrada } = bathroom;
	
	let oSSHH = useRef(null);
	let baths_amount = baths / 2;

	let wallsArr = [
		{
			wall: "front",
			num: 1
		},
		{
			wall: "front",
			num: 2
		},
		{
			wall: "sides",
			num: 1,
			rotate: true
		},
		{
			wall: "sides",
			num: 2
		},
		{
			wall: "back",
			num: 1,
			rotate: true
		}
	]
	
	let walls = new WallsClass(bathroom, baths_amount, wall_thickness);

	n_pabellon === 1 && console.log("APARENTE TOTAL WIDTH DEL BATHROOM:", walls.back.length);
	
	useEffect(() => {
		var boundingBox = new Box3().setFromObject(oSSHH.current);
		const xSize = boundingBox.max.x - boundingBox.min.x;
		n_pabellon === 1 && console.log("REAL BATHROOM LENGTH:", xSize);
	}, []);

	return (
		<group
			position={position}
			rotation={rotation}
			ref={oSSHH}
		>
            {stairs && <Stairs position={[463.1, 4, 190]} index={0} />}

			<group	// classroom length - bathroom length === 79.33       // 192.67
				// position={[272 - (este ? 79.33 : 79.33), 0, sides_wall.length + wall_thickness]}
				position={[192.67, 0, walls.sides.length + wall_thickness]}
			>
				{wallsArr.map((el, index) => {
					return (
						<WallSSHH
							key={index}
							position={walls[el.wall].position[el.num]}
							rotation={walls[el.wall].rotation[el.num]}
							length={walls[el.wall].length}
							shape={walls[el.wall].shape}
							rotate={el.rotate}
							wall_thickness={wall_thickness}
						/>
					)
				})}

				<mesh position={[-32.7, 30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[50, 50]} />
					<meshBasicMaterial side={DoubleSide} />
				</mesh>

				<Bathroom
					bathroom={bathroom}
					amount={baths_amount}
					increment_scale={increment_scale}
					wall_thickness={wall_thickness}
					// total_width={walls.back.length}
				/>

				{/* PASILLO DE ENTRADA */}
				<Pasillo
					args={[pasillo_de_entrada, walls.back.length]}
					position={[-24.5, 0.15, (-pasillo_de_entrada / 2)]}
					rotation={[-Math.PI / 2, 0, Math.PI / 2]}
					color={0x3d3d3d}
				/>

				{/* PASILLO LEFT */}
				<Pasillo
					args={[pasillo, walls.sides.length]}
					position={[-125.5, 0.15, (-walls.sides.length / 2) - 0.5]}
					rotation={[-Math.PI / 2, 0, 0]}
					color={0x3d3d3d}
				/>

				{/* PASILLO RIGTH */}
				<Pasillo
					args={[pasillo, walls.sides.length]}
					position={[inodoro + wall_thickness + 1, 0.15, (-walls.sides.length / 2) - 0.5]}
					rotation={[-Math.PI / 2, 0, 0]}
					color={0x3d3d3d}
				/>
			</group>
		</group>
	)
}
