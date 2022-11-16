import { useRef } from "react";
import Plan3D from "../../Plan3D/Plan3D";
import PlanFloor from "../../PlanFloor/FloorPlan";

export default function RenderScene({ result_data, classroom_measurements, construction_info, baths_amount }) {
	let div = useRef();

	// window.onresize = function(evt) {
	// 	div.current.style.width = (window.innerWidth - 278).toString() + "px";
	// 	div.current.style.height = (window.innerHeight - 80).toString() + "px";
	// }

	return (
		// <div style={{width: window.innerWidth - 278, height: window.innerHeight - 80, marginTop: "5.6rem", marginLeft: ".7rem"}} ref={div}>
			<Plan3D
				result_data={result_data}
				classroom_measurements={classroom_measurements}
				construction_info={construction_info}
				baths_amount={baths_amount}
			/>
		// </div>
	)
}
