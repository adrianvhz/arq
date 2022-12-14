import { Scene, Matrix4, TextureLoader, Shape, RepeatWrapping, CullFaceFrontBack } from "three";
import { useState, useRef, useMemo } from "react";
import { Canvas, useThree, createPortal, useLoader, extend } from "@react-three/fiber";
import { useCamera } from "@react-three/drei";
import wallPath from "../../../assets/textures/wall.png"
import Pabellones from "./components/Pabellones/Pabellones";
import InitConfig from "./components/InitConfig/InitConfig";
import SoccerFieldView from "../components/SoccerFieldView/SoccerFieldView";
import TerrainView from "../components/TerrainView/TerrainView";
import Stairs from "./components/Stairs/Stairs";
import SSHH from "./components/SSHH/SSHH";
import ClassroomGroup from "./components/ClassroomGroup/ClassroomGroup";
import Test from "../Test/Test";
import Pasillo from "./components/Pasillo/Pasillo";

export default function Plan3D({ result_data, classroom_measurements, construction_info, baths_amount, data }) {
    let increment_scale = 50;
    let wall_thickness = 7.5; // 15cm (0.15 * increment_scale)

    let terrain_side = construction_info.area_general**0.5;

    let terrain = {
        length: terrain_side * increment_scale,
        width: terrain_side * increment_scale
    }
    
    let amount_classrooms = result_data.aulas; // 30

    let classroom = {
        length: (classroom_measurements.muro_horizontal * increment_scale) + (wall_thickness * 2),
        width: (classroom_measurements.muro_vertical * increment_scale) + (wall_thickness * 2),
        height: 2.2 * increment_scale,
		bigas: {
			horizontal: {
				width: 0.30 * increment_scale,
				height: 0.60 * increment_scale
			},
			vertical: {
				width: 0.30 * increment_scale,
				height: 0.40 * increment_scale
			}
		}
    }

	let bathroom = {
		lavamanos: 0.60 * increment_scale,
		inodoro: 1.40 * increment_scale, // largo del cubiculo
		ancho_de_cubiculo: 0.85 * increment_scale, // ancho del baño (cubiculo y lavamanos)
		pasillo: 1.20 * increment_scale,
		pasillo_de_entrada: 1 * increment_scale
	}

    let stairs = {
        flight: { // tramo de escalones
            width: 1.20 * 50,
            riser: 0.17 * 50, // contrapaso
            tread: 0.25 * 50, // paso
        },
        landing: { // descanso
            width: 1.20 * 50,
            length: 2.40 * 50
        },
        width: 2.40 * 50,
        length: (1.20 * 50 * 2) + (8 * 0.25 * 50),
        flight1_amount: 8,
	    flight2_amount: 8
    }

    let soccer_field = {
        width: 15 * increment_scale, // 22
        length: 28 * increment_scale // 44
    }

    let pasillo = {
        width: 2.4 * increment_scale
    }

    // let amount_pabellones = Math.ceil(((amount_classrooms + amount_bathrooms) * classroom_length) / (terrain_width * classroom_add_scale));

    // initial classroomsBySide
    // let classroomsBySide = Math.ceil(amount_classrooms / (amount_pabellones * 2));

    // console.log("result_data", result_data); console.log("classroom_measurements", classroom_measurements); console.log("construction_info", construction_info);
    // console.log("classrooms", amount_classrooms); console.log("classroom_length", classroom_length); console.log("classroom_width", classroom_width); console.log("amount_pabellones", amount_pabellones);
    
    // console.log("CLASSROOM_LENGTH:", classroom_length); console.log("TERRENO:", terrain_length);



    // let orthographic = new OrthographicCamera();
    // orthographic.position.set(700.0833006726812, 3240.991418099096, 0.9116933195872228);
    // orthographic.rotation.set("-1.5705150260514118", "0.21274036703194613", "1.5694640280967271", "XYZ");
    // orthographic.top = 428.5;
    // orthographic.left = -507;
    // orthographic.right = 507;
    // orthographic.bottom = -428.5;
    // orthographic.far = 7000;

    // let perspective = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 4, 7000);
    // perspective.fov = 65;
    // perspective.aspect = window.innerWidth / window.innerHeight;
    // perspective.position.set(3202.3188734998785, 858.758291437268, -42.78855655034773);
    // perspective.rotation.set("-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ");
    // perspective.far = 7000;
    // perspective.near = 4;

    return (
        <Canvas 
            camera={{
                fov: 65, // 60
                aspect: window.innerWidth / window.innerHeight,
                position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
                rotation: ["-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"],
                far: 7000, // 3200
                near: 4
            }}
        >
            <InitConfig />
            
            <Pabellones
                amount_classrooms={amount_classrooms}
                classroom={classroom}
                bathroom={bathroom}
                baths_amount={baths_amount}
                data={data}
                stairs={stairs}
                terrain={terrain}
                increment_scale={increment_scale}
                wall_thickness={wall_thickness}
            />

            {/* <Stairs index={0} position={[0, 3, 0]} stairs={stairs} /> */}

            {/* <Test /> */}

            {/* <SSHH
                position={[0, 0, 50]}
                baths={4}
                increment_scale={50}
                wall_thickness={wall_thickness}
                bathroom={bathroom}
		        floor={1}
            /> */}
           
            {/* <ClassroomGroup
                classroom={classroom}
                increment_scale={50}
                // rotation={[0, MathUtils.degToRad(180), 0]}
                wall_thickness={wall_thickness}
            /> */}

            {/* <SoccerFieldView
                terrain={terrain}
                amount_classrooms={amount_classrooms}
                classroom={classroom}
                soccer_field={soccer_field}
                increment_scale={increment_scale}
            />

            <Pasillo
                args={[pasillo.width, terrain.width]}
                position={[-terrain.width / 2, 0, (terrain.width / 2) - classroom.width]}
                rotation={[-Math.PI / 2, 0, 0]}
                color={0x5a5a5a}
            /> */}

            <TerrainView
                width={terrain.width}
                length={terrain.length}
            />
            {/* <gridHelper position={[0, -1, 0]} args={[terrain.width + 348, 20, "black", "gray"]} /> */}
        </Canvas>
    )
}






function ReferenceCube() {
    const { gl, scene, camera, size } = useThree()
    const virtualScene = useMemo(() => new Scene(), [])
    const virtualCam = useRef()
    const ref = useRef()
    const [hover, set] = useState(null)
    const matrix = new Matrix4();

    // useFrame(() => {
    //     matrix.copy(camera.matrix).invert()
    //     ref.current.quaternion.setFromRotationMatrix(matrix)
    //     gl.autoClear = true
    //     gl.render(scene, camera)
    //     gl.autoClear = false
    //     gl.clearDepth()
    //     gl.render(virtualScene, virtualCam.current)
    // }, 1);

    return createPortal(
        <>
            <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 100]} />
            <mesh
            ref={ref}
            raycast={useCamera(virtualCam)}
            position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
            onPointerOut={(e) => set(null)}
            onPointerMove={(e) => set(Math.floor(e.faceIndex / 2))}>
                {[...Array(6)].map((_, index) => (
                    <meshLambertMaterial attachArray="material" key={index} color={hover === index ? "hotpink" : "white"} />
                ))}
                <boxGeometry args={[60, 60, 60]} />
            </mesh>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
        </>,
        virtualScene
    )
}

function ExtrudeBuffer() {
    const wallImage = useLoader(TextureLoader, wallPath);
    wallImage.repeat.set(1.1, 1.2);
    wallImage.rotation = Math.PI / 2;
    wallImage.wrapS = wallImage.wrapT = RepeatWrapping;

    const length = 12, width = 2;
    var shape = new Shape();
    shape.autoClose = true;
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    // no its part of above
    // for (var j = 1; j < 10; j++) {
    //     shape.lineTo(1, 2);
    //     shape.lineTo(2, 3);
    // }

    return (
        <mesh>
            <extrudeGeometry attach="geometry" args={[shape, { steps: 2, depth: 16, bevelEnabled: true, bevelSegments: 1, bevelSize: 1, bevelThickness: 1, bevelOffset: 0 }]} />  {/* { steps: 100, depth: 2, bevelSegments: 1, curveSegments: 1 } */}
            <meshLambertMaterial attach="material" map={wallImage} />
        </mesh>
    )
}

function BufferGeometry(props) {
    const vertices = [
        // front
        { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
        
        { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
        // right
        { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
        { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
        
        { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
        { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
        { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
        // back
        { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
        { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
        { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
        
        { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
        { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
        { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
        // left
        { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 1], },
        { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
        { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
        
        { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
        { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 0], },
        // top
        { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 1], },
        { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
        
        { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
        { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 0], },
        // bottom
        { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 1], },
        { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
        { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
        
        { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
        { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
        { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 0], },
    ];

    const positions = [];
    const normals = [];
    const uvs = [];

    for (var vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }
    
    const wallImage = useLoader(TextureLoader, wallPath);

    return (
        <mesh>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={new Float32Array(positions)}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-normal"
                    array={new Float32Array(normals)}
                    count={normals.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-uvs"
                    array={new Float32Array(uvs)}
                    count={uvs.length / 2}
                    itemSize={2}
                />
            </bufferGeometry>
            <meshBasicMaterial map={wallImage} />
        </mesh>
    )
}
