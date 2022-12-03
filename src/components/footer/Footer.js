import style from "./Footer.module.css";

// destructuramos los datos que manda el padre
function Footer({ finalizarPartida }) {
	return (
		<div id={style.footer}>
            {/* llamamos la funcion para acabar la partida */}
			<button onClick={() => finalizarPartida()}>
				Finalizar Partida
			</button>
		</div>
	);
}

export default Footer;
