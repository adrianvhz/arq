import { useEffect, useRef } from "react";
import Walls from "./components/Walls";
import Columns from "./components/Columns";
import Roof from "./components/Roof";
import { Box3 } from "three";
import Bigas from "./Bigas";
// import wallSVG from "../../../../assets/svg/";
// import Svg from "../../../Test/Svg";

// loader.load(
// 	wallSVG,
// 	(data) => {
// 		const paths = data.paths;
// 		const group = new THREE.Group();

// 		for ( let i = 0; i < paths.length; i ++ ) {

// 			const path = paths[ i ];

// 			const material = new THREE.MeshBasicMaterial( {
// 				color: path.color,
// 				side: THREE.DoubleSide,
// 				depthWrite: false
// 			} );

// 			const shapes = SVGLoader.createShapes( path );

// 			for ( let j = 0; j < shapes.length; j ++ ) {

// 				const shape = shapes[ j ];
// 				const geometry = new THREE.ShapeGeometry( shape );
// 				const mesh = new THREE.Mesh( geometry, material );
// 				group.add( mesh );

// 			}
// 		}
// 		scene.add( group );
// 	},
// 	(xhr) => {
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 	},
// 	(err) => {
// 		console.log( 'An error happened: ' + err.message );
// 	}
// );

export default function ClassroomGroup({ position, rotation, classroom, increment_scale, wall_thickness, level, index }) {
	const ref = useRef(null);

	const handleClick = () => {
		const boundingBox = new Box3().setFromObject(ref.current);
		const xSize = boundingBox.max.x - boundingBox.min.x;
		const ySize = boundingBox.max.y - boundingBox.min.y;
		const zSize = boundingBox.max.z - boundingBox.min.z;

		console.log("REAL CLASSROOM HEIGHT:", ySize);
	}
	// el bevelThickness de extrudeSettings aumenta el tamano en + el x2 del valor del bevelThickness

	return (
		<group
			position={position}
			rotation={rotation}
			onClick={handleClick}
			ref={ref}
		>
			<Walls
				classroom={classroom}
				wall_thickness={wall_thickness}
				level={level}
				index={index}
			/>

			<Columns
				classroom={classroom}
				wall_thickness={wall_thickness}
				increment_scale={increment_scale}
			/>

			{/* classroom lights */}
			{/* <pointLight
				args={[0xffffff, 1, 245]}
				position={[207, 118, 155]}
				// castShadow
				// shadow-mapSize={[2048, 2048]}
			>
				<mesh>
					<sphereGeometry args={[2]} />
					<meshStandardMaterial color={0xdba908} emissive={0x917005} />
				</mesh>

			</pointLight> */}

			<Bigas
				classroom={classroom}
			/>

			<Roof
				position={[0, classroom.height + classroom.bigas.horizontal.height + 0.4, 0]} // y = -1.00000000000009 + classroom.height + 0.1
				classroom={classroom}
				extraRoff={50}
			/>
			
			{/* <Svg position={[43, 10, 31]} /> */}
		</group>
	)
}
