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
    </div>
  );
}

export default DisplayRegistroActual;
