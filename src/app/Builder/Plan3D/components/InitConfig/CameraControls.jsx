import { FlyControls, OrbitControls, FirstPersonControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setCameraControls } from "../../../../../redux/building/buildingSlice";

export default function CameraControls({ view }) {
	let cameraControls = useSelector(state => state.building.cameraControls);
	let dispatch = useDispatch();

	const stopFly = function(evt) {
		if (evt.key === "Escape") dispatch(setCameraControls({ cameraControls: "non-play" }));
	}

	window.onkeyup = cameraControls === "play"
		? stopFly
		: null;

	if (cameraControls === "play") {
		return <FlyControls rollSpeed={.7} movementSpeed={700} />
	}
	else {
		return (
			<OrbitControls
				rotateSpeed={0.5}
				zoomSpeed={1}
				panSpeed={0.5}
				enableRotate={view === "3D"}
				minZoom={0.17066106572499624}
			/>
		)
	}
	/* <FirstPersonControls movementSpeed={10} lookSpeed={.1} /> */
}
