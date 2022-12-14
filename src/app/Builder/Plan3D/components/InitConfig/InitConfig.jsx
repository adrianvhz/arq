import { useEffect } from "react";
import { Sky, GizmoHelper, GizmoViewcube, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import CameraControls from "./CameraControls";
import "./styles.css";
import { useRef } from "react";

export default function InitConfig() {
    let view = useSelector(state => state.building.view);

	// let { gl, scene, camera } = useThree(({ gl, scene, camera }) => ({ gl, scene, camera }));
	let gl = useThree(state => state.gl);
	let scene = useThree(state => state.scene);
	let camera = useThree(state => state.camera);

	// window.onresize = function(evt) {
	// 	camera.aspect = (window.innerWidth - 278) / (window.innerHeight - 80);
	// 	gl.setSize(window.innerWidth - 278, window.innerHeight - 80);
	// }

	// console.log("initConfig");

	let ref = useRef(null);

	const link = document.createElement("a");

	document.getElementById("save-jpeg").onclick = function() {
		gl.render(scene, camera);
		const dataURL = gl.domElement.toDataURL("image/jpeg");

		link.setAttribute("href", dataURL);
		link.setAttribute("download", "canvas.jpeg");
		link.click();
	}
	
	document.getElementById("save-obj").onclick = function() {
		console.log(123)
		const exporter = new OBJExporter();
		const data = exporter.parse(scene);

		link.setAttribute("href", URL.createObjectURL(new Blob([data], { type: "text/plain" })));
		link.setAttribute("download", "test.obj");
		link.click();
	}
	
	if (view === "2D") gl.domElement.classList.add("cursor-cross");
	else gl.domElement.classList.remove("cursor-cross");

	let frustumSize = 857;
	let aspect = window.innerWidth / window.innerHeight;


	return (
		<>
			{/* <color attach="background" args={[0xebebeb]} /> */}
			<color attach="background" args={["#edf7fb"]} />

			{view === "2D" && (
				<OrthographicCamera
					makeDefault
					manual
					position={[0.0033158862420857344, 3315.741671368019, 0.000004318159471182016]}
					rotation={["-1.5707963254925756", "0.000001000043601318168", "1.5694940634737558", "XYZ"]}
					left={frustumSize * aspect / - 2}
					right={frustumSize * aspect / 2}
					top={frustumSize / 2}
					bottom={frustumSize / - 2}
					zoom={0.23180497402501982}
					near={4}
					far={7000}
				/>
			)}

			{/* <Stars radius={1000} depth={1000} count={5000} factor={4} /> */}

            {/* <Sky
                distance={3000000}
                sunPosition={[0, 1, 0]}
                inclination={0.5}
                azimuth={0.25}
            /> */}

            <ambientLight intensity={0.2} />

			<directionalLight
				args={[0xffffff, 0.5]}
				position={[10, 19, 50]}
				// position={[10, 19, 0]}
				// castShadow
				shadow-mapSize={[2048, 2048]}
				ref={ref}
			>
				{/* <mesh
					scale={[2.5, 2.5, 2.5]}
					onClick={() => {
						ref.current.intensity = ref.current.intensity === 1 ? 0.3 : 1
					}}
				>
					<sphereGeometry args={[5]} />
					<meshStandardMaterial color={"yellow"} emissive={"red"} />
				</mesh> */}

			</directionalLight>

			{view === "3D" && (
				<GizmoHelper alignment="bottom-right" margin={[50, 50]} >
					<GizmoViewcube
						color="#8b98a5"
						textColor="#f5f5f5"
						strokeColor="#000000"
					/>
            	</GizmoHelper>
			)}

			<CameraControls view={view} />
		</>
	)
}
