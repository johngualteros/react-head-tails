import style from "./Valores.module.css";

// destructuramos los datos que manda el padre
function Valores({opcion, ganadas, perdidas, dinero}) {
	return (
		// mostramos los datos
		// estilos usados con module.css para que no afecten a otros componentes
		<div id={style.contenedorValores}>
			<div className="ganadas">
				<h2>
					Veces Ganadas: <span>{ganadas}</span>
				</h2>
			</div>
			<div className="perdidas">
				<h2>
					Veces Perdidas: <span>{perdidas}</span>
				</h2>
			</div>
			<div className="opcion">
				<h2>
					Opción Actual: <span>{opcion ? opcion : "Escoge"}</span>
				</h2>
			</div>
			<div className="dinero">
				<h2>
					Dinero Total: <span>${dinero}</span>
				</h2>
			</div>
		</div>
	);
}

export default Valores;
