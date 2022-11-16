import { useSelector } from "react-redux";
import SoccerField from "../../Plan3D/components/SoccerField/SoccerField";
import SoccerField2D from "../../PlanFloor/components/SoccerField2D/SoccerField2D";

export default function SoccerFieldView({ terrain, amount_classrooms, classroom, soccer_field, increment_scale }) {
	let view = useSelector(state => state.building.view);
	let SoccerField_OBJ = view === "3D" ? SoccerField : SoccerField2D;

	return (
		<SoccerField_OBJ
			terrain={terrain}
			amount_classrooms={amount_classrooms}
			classroom={classroom}
			soccer_field={soccer_field}
			increment_scale={increment_scale}
		/>
	)
}
