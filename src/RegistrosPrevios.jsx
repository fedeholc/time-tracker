import { FaTrash } from "react-icons/fa";

export default function RegistrosPrevios({ midata, handleRec }) {
  return (
    <div>
      <div
        style={{
          border: `1px solid rgba(192,38,211, 20%)`,
          paddingLeft: "1rem",
          paddingRight: "1rem",
          height: "500px",
          overflowY: "scroll",
          maxWidth: "500px",
        }}
        className="text-1xl text-black  "
      >
        {midata &&
          midata.map((e) => {
            let inicio = new Date(e.inicio);
            let fin = new Date(e.fin);
            let textoInicio = `Inicio: ${inicio.toLocaleDateString()} - ${inicio.toLocaleTimeString()}`;
            let textoDuracion = `Duración: ${new Date(
              fin.getTime() - inicio.getTime()
            )
              .toISOString()
              .slice(11, 19)}`;
            return (
              <div
                style={{ border: `2px solid ${e.color}` }}
                className="flex flex-row justify-between border my-3 p-2 rounded-md shadow-md"
                key={e.id}
              >
                <div>
                  <div className=" text-2xl ">{e.titulo} </div>
                  <div className=" text-sm ">
                    {textoInicio} / {textoDuracion}
                  </div>
                  <div className=" text-sm ">Tags: {e.tags}</div>
                </div>
                <div>
                  <button
                    data-action="borrar"
                    data-key={e.id}
                    onClick={handleRec}
                    style={{ color: `${e.color}` }}
                  >
                    <FaTrash className="ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
