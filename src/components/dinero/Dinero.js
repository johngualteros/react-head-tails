import { useState } from "react";
import style from "./Dinero.module.css";

// destructuramos la variable para asignar un estado que manda el padre
function Dinero({setInput}) {

	// funcion para cambiar ek estado de la variable cuando algo cambia en el input
	function cambiarValor(e) {
        setInput(e.target.value);
    }

	return (
		<div id={style.contenedorInput}>
			{/* input para poner el valor a apostar */}
			<input type="number" placeholder="Digite la cantidad a jugar" onChange={cambiarValor}/>
		</div>
	);
}

export default Dinero;
