import Walls from "./components/Walls";
import Columns from "./components/Columns";
import Roof from "./components/Roof";
import Door from "./components/Door";
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

export default function ClassroomGroup({ position, rotation, classroom, increment_scale, wall_thickness, index }) {
	
	return (
		<group
			position={position}
			rotation={rotation}
		>
			<Walls
				classroom={classroom}
				wall_thickness={wall_thickness}
				index={index}
			/>

			<Columns
				classroom={classroom}
				wall_thickness={wall_thickness}
				increment_scale={increment_scale}
			/>

			{/* <Door /> */}

			<Roof
				classroom={classroom}
			/>
			
			{/* <Svg position={[43, 10, 31]} /> */}
		</group>
	)
}
