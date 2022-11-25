import { FlyControls, OrbitControls, FirstPersonControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setPlayCamera } from "../../../../../redux/building/buildingSlice";

export default function CameraControls({ view }) {
	let isPlayCamera = useSelector(state => state.building.isPlayCamera);
	let dispatch = useDispatch();

	const stopFly = function(evt) {
		if (evt.key === "Escape") dispatch(setPlayCamera({ isPlayCamera: "non-play" }));
	}

	window.onkeyup = isPlayCamera === "play"
		? stopFly
		: null

	if (isPlayCamera === "play") {
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
