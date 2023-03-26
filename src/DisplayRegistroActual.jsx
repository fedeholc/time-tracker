import { useState, useEffect } from "react";

function DisplayRegistroActual(props) {
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setFecha(new Date());
    }, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const textoTiempoTotal = `${new Date(
    fecha.getTime() - props.nuevoRegistro.inicio.getTime()
  )
    .toISOString()
    .slice(11, 19)}`;

  // para la opción de pausa:
  /* const textoTiempoPausado = `${new Date(
    fecha.getTime() - props.tiempoPausado.inicioPausa.getTime()
  )
    .toISOString()
    .slice(11, 19)}`;

  const textoTiempoPausadoTotal = `Pausado total: ${props.tiempoPausado.tiempoContado}`; */

  //fecha.getTime() - props.tiempoPausado.inicioPausa.getTime();

  return (
    <div className="">
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "2rem",
          color: props.nuevoRegistro.color,
          maxWidth: "500px",
        }}
      >
        {props.isRegistrando ? props.nuevoRegistro.titulo : "---"}
      </div>

      <div
        className="flex flex-row justify-center"
        style={{
          fontWeight: "bolder",
          fontSize: "5rem",
          margin: "-0.5rem",
          color: props.nuevoRegistro.color,
        }}
      >
        {props.isRegistrando ? textoTiempoTotal : "---"}
      </div>

      <div
        className="flex flex-row justify-center"
        style={{ fontWeight: "normal", fontSize: "0.8rem" }}
      >
        Inicio:{" "}
        {props.isRegistrando
          ? props.nuevoRegistro.inicio.toLocaleTimeString()
          : "---"}
      </div>

      {/*  para la opción de pausa: */}
      {/*  <div style={{ fontWeight: "normal", fontSize: "0.8rem" }}>
        Tiempo pausado: {props.isPausado ? textoTiempoPausado : "---"}
      </div> */}
      {/*   <div style={{ fontWeight: "normal", fontSize: "0.8rem" }}>
       
        Tiempo pausado total: {textoTiempoPausadoTotal}
      </div> */}
    </div>
  );
}

export default DisplayRegistroActual;
