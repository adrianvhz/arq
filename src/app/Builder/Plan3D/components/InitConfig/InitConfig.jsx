import { useEffect } from "react";
import { Sky, GizmoHelper, GizmoViewcube, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Euler } from "three";
import { useThree } from "@react-three/fiber";
import { useSelector } from 'react-redux';
import CameraControls from "./CameraControls";
import "./styles.css";
import { useRef } from "react";

export default function InitConfig() {
    let view = useSelector(state => state.building.view);

	var ortho = useRef();
	var pers = useRef();

	let { camera, gl, set, get } = useThree(({ get, set , camera, gl }) => ({ get, set, camera, gl  }));

	// window.onresize = function(evt) {
	// 	camera.aspect = (window.innerWidth - 278) / (window.innerHeight - 80);
	// 	gl.setSize(window.innerWidth - 278, window.innerHeight - 80);
	// }

	// window.onkeyup = function(evt) {
	// 	if (evt.key === "Escape") {
	// 		dispatch(setCameraControls({ cameraControls: "non-play" }));
	// 	}
	// 	// console.log(camera)
	// }

	console.log("initConfig");

	if (view === "2D") gl.domElement.classList.add("cursor-cross");
	else gl.domElement.classList.remove("cursor-cross");

	// useEffect(() => {
	// 	if (view === "2D") {
	// 		set({ camera: ortho.current })
	// 	} else {
	// 		set({ camera: pers.current })
	// 	}
	// 	console.log(123)
	// }, [get, set])

	useEffect(() => {
		console.log(camera)
	})

	// console.log(camera)


	// useEffect(() => {

	// 	let cam = new OrthographicCamera();
	// 	cam.position.set([700.0833006726812, 3240.991418099096, 0.9116933195872228]);
	// 	cam.rotation.set("-1.5705150260514118", "0.21274036703194613", "1.5694640280967271", "XYZ");
	// 	cam.top = 428.5;
	// 	cam.left = -507;
	// 	cam.right = 507;
	// 	cam.bottom = -428.5;
	// 	cam.far = 7000;
	// 	cam.near = 3;


	
    // state.camera.position.lerp(vec.set(x, y, z), step)
    // state.camera.lookAt(0, 0, 0)
    // state.camera.updateProjectionMatrix()


	// 	if (view === "2D") set({ camera: cam });
	// }, []);

	let frustumSize = 857;
	let aspect = window.innerWidth / window.innerHeight;

	console.log(frustumSize, aspect)

	return (
		<>
			{/* <color attach="background" args={[0x4f4f4f]} /> */}
			<color attach="background" args={[0xebebeb]} />

			{/* <PerspectiveCamera
				ref={pers}
                name="3D"
                position={[3202.3188734998785, 858.758291437268, -42.7885565503477]}
                rotation={[-1.6205812315008037, 1.3084828063007592, 1.6223414925263104, "XYZ"]}
                fov={65}
                aspect={window.innerWidth / window.innerHeight}
                far={7000}
                near={4}
            />

			<OrthographicCamera
				ref={ortho}
				rotation={new Euler("-1.5705150260514118", "0.21274036703194613", "1.5694640280967271", "XYZ")}
				top={428.5}
				left={-507}
				right={507}
				bottom={-428.5}
				far={7000}
				near={3}
				zoom={0.19874378960470135}
			/> */}

			{view === "2D" && (
				<OrthographicCamera
					makeDefault
					manual
					position={[700.0833006726812, 3240.991418099096, 0.9116933195872228]}
					rotation={["-1.5705150260514118", "0.21274036703194613", "1.5694640280967271", "XYZ"]}
					left={frustumSize * aspect / - 2} // -507
					right={frustumSize * aspect / 2} // 507
					top={frustumSize / 2} // 428.5
					bottom={frustumSize / - 2} // -428.5
					zoom={0.19874378960470135}
					near={3}
					far={7000}
				/>
			)}

			{/* <Stars radius={1000} depth={1000} count={5000} factor={4} /> */}

            {/* <Sky
                distance={3000000}
                sunPosition={[3, 0, 5]}
                inclination={0.5}
                azimuth={0.25}
            /> */}

            <ambientLight intensity={0.2} />

			<directionalLight
				args={[0xffffff, 0.5]}
				position={[10, 20, 0]}
				castShadow
				shadow-mapSize={[2048, 2048]}
			>
				{/* <mesh>
					<sphereGeometry args={[5]} />
					<meshStandardMaterial color={"yellow"} emissive={new Color("red")} />
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
