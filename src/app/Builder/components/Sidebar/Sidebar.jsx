import { useEffect } from "react";
import "./styles.css";

export default function Sidebar({ result_data, classroom_measurements, construction_info, state }) {

	useEffect(() => {
		Array.from(document.getElementsByClassName("sidebar-item")).forEach(el => {
			el.className = "sidebar-item active"
		})
	}, []);
	
	return (
		<div className="sidebar">
			<ul className="sidebar-list">
				<li className="sidebar-item">
					{/* <a href="/" className="sidebar-anchor">Proyecto: </a> */}
					<span className="sidebar-anchor">Proyecto: </span>
					<p style={{marginTop: ".4rem"}}>Nombre: {state.name}</p>
					<p>Versión: VERSIÓN 1: HOME</p>
					<p>Zona: {state.zone}</p>
					<p>Niveles: {new Intl.ListFormat('es', { style: "long", type: "conjunction" }).format(JSON.parse(state.level))}</p>
					<p>Tipo: {state.sublevel}</p>
					<p>Aforo maximo: {result_data.aforo_maximo}</p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Terreno: </a> */}
					<span className="sidebar-anchor">Terreno: </span>
					<p>Area total: {result_data.area_total}m<span style={{fontSize: "1.5rem"}}>²</span></p>
					<p>Area parcial: {result_data.area_parcial}</p>
					<p>Circulación: {Math.ceil(result_data.circulacion)}</p>
					<p>Area general: {construction_info.area_general}m<span style={{fontSize: "1.5rem"}}>²</span></p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Cantidad: </a> */}
					<span className="sidebar-anchor">Cantidad: </span>
					<p style={{marginTop: ".4rem"}}># Aulas: {result_data.aulas}</p>
					<p># Baños: 2</p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Medidas de Aula</a> */}
					<span className="sidebar-anchor">Medidas de Aula</span>
					<p>Columna: 0.25m<span style={{fontSize: "1.5rem"}}>²</span></p>
					<p>Largo: {classroom_measurements.muro_horizontal}</p>
					<p>Ancho: {classroom_measurements.muro_vertical}</p>
				</li>
			</ul>
		</div>
	)
}
