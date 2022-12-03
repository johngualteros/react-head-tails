import { useState, useEffect } from "react";
import Dinero from "../dinero/Dinero";
import Footer from "../footer/Footer";
import Valores from "../valores/Valores";
import style from "./Moneda.module.css";

function Moneda() {
	// opciones que pueden caer
	const opciones = ["Cara", "Sello"];

	// estado para guardar el resultado
	const [resultado, setResultado] = useState("");

	// estado para guardar si gano o no
	const [gano, setGano] = useState("");

	// estado para guardar la opcion que escogio el usuario
	const [opcion, setOpcion] = useState("");

	// estado para guardar el contador de veces que ah ganado el usuario
	// busca en el almacenamiento local si existe esa llave ganadas si no será 0
	const [ganadas, SetGanadas] = useState(
		localStorage.getItem("ganadas") || 0
	);

	// estado para guardar el contador de veces que ah perdido el usuario
	// busca en el almacenamiento local si existe esa llave perdidad si no será 0
	const [perdidas, SetPerdidas] = useState(
		localStorage.getItem("perdidas") || 0
	);

	// estado para guardar el dinero que tiene el usuario
	// busca en el almacenamiento local si existe esa llave dinero si no será 1000
	const [dinero, SetDinero] = useState(
		localStorage.getItem("dinero") || 1000
	);

	// estado para guardar el valor que el usuario quiere apostar
	const [input, setInput] = useState(0);

	// estado para definir el estado de la partida
	const [estadoPartida, setEstadoPartida] = useState("iniciada");

	// función que se ejecuta solo una vez apenas inicia la app y asigna el estado de la partida iniciada
	useEffect(() => {
		setEstadoPartida("iniciada");
	}, []);

	// función que se ejecuta cuando se elige una opcion
	const lanzarMoneda = (opcionUsuario) => {
		// asignamos la opcion que escogio el usuario
		setOpcion(opcionUsuario);

		// alerta para verificar si quiere continuar
		if (window.confirm("¿Quiere Seguir jugando?")) {
			// validar si la apuesta es mayor a 0 y menor que el dinero que tiene
			if (input > 0 && input <= dinero) {
				// obtenemos el id y agregamos la clase para que gire la moneda
				document.getElementById("lado").classList.add(style.girar);

				// tiempo que se demorara girando la moneda
				setTimeout(() => {
					// asignamos el resultado de la moneda con el metodo random y floor para que sea un entero
					// length es la longitud del array opciones
					const resultado =
						opciones[Math.floor(Math.random() * opciones.length)];
					setResultado(resultado);

					//quitamos la clase para que deje de girar la moneda
					document
						.getElementById("lado")
						.classList.remove(style.girar);

					// validamos si el usuario gano o perdio
					if (opcionUsuario === resultado) {
						//actualizamos el estado si gano a true pero es un string
						setGano("true");
						// actualizamos el contador de veces que ah ganado el usuario y parseamos a entero
						SetGanadas(parseInt(ganadas) + 1);
						// guardamos en el localStorage la llave ganadas y el valor que tiene ganadas
						/**
						 * el localStorage se abre control + shift + c y en application esta el local storage
						 */
						localStorage.setItem("ganadas", parseInt(ganadas) + 1);

						// actualizamos el dinero que tiene el usuario y parseamos a entero lo multiplicamos por 2
						// porque gano y le multiplicamos lo que aposto
						SetDinero(parseInt(dinero) + parseInt(input * 2));

						// guardamos en el localStorage la llave dinero y el valor que tiene dinero
						localStorage.setItem(
							"dinero",
							parseInt(dinero) + parseInt(input * 2)
						);
					} else {
						//actualizamos el estado si gano a false pero es un string
						setGano("false");
						// actualizamos el contador de veces que ah perdido el usuario y parseamos a entero
						SetPerdidas(parseInt(perdidas) + 1);
						// guardamos en el localStorage la llave perdidas y el valor que tiene perdidas
						localStorage.setItem(
							"perdidas",
							parseInt(perdidas) + 1
						);

						// actualizamos el dinero que tiene el usuario y parseamos a entero restamos lo que aposto con el total
						SetDinero(parseInt(dinero) - parseInt(input));
						// Guardamos el dinero que tiene el usuario en el localStorage
						localStorage.setItem(
							"dinero",
							parseInt(dinero) - parseInt(input)
						);
					}
					// el 2000 quiere decir que todo esto se hará en 2000 milisegundos es decir 2 segundos
				}, 2000);
				// si no cumple con las condiciones de la apuesta
			} else if (dinero === 0) {
				alert("No tienes dinero para jugar");
			} else if (input > dinero) {
				alert("No puedes apostar mas dinero del que tienes");
			}
		}
	};

	// función que se ejecuta para acabar la partida
	const finalizarPartida = () => {
		setEstadoPartida("finalizada");
		mostrarDatosFinalPartida();
	};

	// función que se ejecuta para mostrar los datos de la partida finalizada
	const mostrarDatosFinalPartida = () => {
		if (estadoPartida === "finalizada") {
			// el \n es para hacer un salto de linea
			alert(
				"Ganaste: " +
					ganadas +
					"\n" +
					" veces. Perdiste: " +
					perdidas +
					"\n" +
					" Dinero Total: " +
					dinero
			);

			// limpiamos el localStorage
			localStorage.clear();
			// recargamos la página
			window.location.reload();
		}
	};

	return (
		<>
			{/* componente donde le pasamos las props */}
			<Valores
				opcion={opcion}
				ganadas={ganadas}
				perdidas={perdidas}
				dinero={dinero}
			/>

			{/* contenedor de la moneda */}
			<div id={style.moneda}>
				<div className={style.lado} id="lado">
					{resultado}
				</div>
			</div>

			{/* componente donde le pasamos la variable para asignar el valor que ingresa el usuario para apostar */}
			<Dinero setInput={setInput} />

			<div id={style.contenedorBoton}>
				{/* boton donde le pasa la opción Cara */}
				<button id={style.boton} onClick={() => lanzarMoneda("Cara")}>
					Cara
				</button>
				{/* boton donde le pasa la opción Sello */}
				<button id={style.boton} onClick={() => lanzarMoneda("Sello")}>
					Sello
				</button>
			</div>

			{/* si gano es igual a true en string mostrará ganaste o si gano es igual a false mostrará perdio si no nada */}
			{/* esto es una condición ternaria */}
			{gano === "true" ? (
				<h1>Ganaste</h1>
			) : gano === "false" ? (
				<h1>Perdiste</h1>
			) : null}

			{/* componente donde le pasamos como prop la funcion para finalizar la partida */}
			<Footer finalizarPartida={finalizarPartida} />
		</>
	);
}

export default Moneda;
