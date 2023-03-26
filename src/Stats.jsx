import React from "react";

const formatTime = (milliseconds) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

export default function Stats({ midata }) {
  let statData;
  statData = midata.map((e) => {
    let inicio = new Date(e.inicio);
    let fin = new Date(e.fin);
    let duracion = fin.getTime() - inicio.getTime();
    return { ...e, duracion: duracion };
  });

  let titulos;
  titulos = statData.map((e) => e.titulo);
  titulos = titulos.filter((e, i) => titulos.indexOf(e) === i && e !== "");

  let titulosStats = [];
  titulos.forEach((titulo) => {
    let duracionTotal = 0;
    let registros = 0;
    statData.forEach((e) => {
      if (titulo === e.titulo) {
        duracionTotal += e.duracion;
        registros++;
      }
    });
    titulosStats.push({
      titulo: titulo,
      duracion: duracionTotal,
      registros: registros,
    });
  });

  let tags = [];
  statData.forEach((e) => {
    e.tags.split(",").forEach((tag) => {
      tag ? tags.push(tag) : null;
    });
  });
  tags = tags.filter((e, i) => tags.indexOf(e) === i && e !== "");

  let tagsStats = [];
  tags.forEach((tags) => {
    let duracionTotal = 0;
    let registros = 0;
    statData.forEach((e) => {
      let tempTags = [];
      e.tags.split(",").forEach((tag) => {
        tag ? tempTags.push(tag) : null;
      });

      if (tempTags.includes(tags)) {
        duracionTotal += e.duracion;
        registros++;
      }
    });
    tagsStats.push({
      tags: tags,
      duracion: duracionTotal,
      registros: registros,
    });
  });

  return (
    <div
      style={{
        border: `1px solid rgba(192,38,211, 20%)`,
        paddingLeft: "1rem",
        paddingRight: "1rem",
        marginBottom: "1rem",
        paddingBottom: "1rem",
        overflowY: "scroll",
        maxWidth: "500px",
      }}
      className="text-1xl text-black  "
    >
      <div className="text-xl py-2">Por título:</div>
      <div className="border-2 border-fuchsia-700">
        {titulosStats.map((e) => {
          return (
            <div
              key={e.titulo}
              className=" odd:bg-gray-200 p-1  flex flex-row justify-between"
            >
              <div className="pr-2">
                <span className="text-md">{e.titulo} </span>
                <span className="text-sm">({e.registros})</span>
              </div>{" "}
              <div><span className="text-xs">Tiempo total:</span> {formatTime(e.duracion)}</div>
            </div>
          );
        })}{" "}
      </div>

      <div className="text-xl py-2">Por tag:</div>
      <div className="border-2 border-fuchsia-700">
        {tagsStats.map((e) => {
          return (
            <div
              key={e.tags}
              className=" odd:bg-gray-200 p-1  flex flex-row justify-between"
            >
              <div className="pr-2">
                <span className="text-md">{e.tags} </span>
                <span className="text-sm">({e.registros})</span>
              </div>{" "}
              <div>
                <span className="text-xs">Tiempo total:</span>{" "}
                {formatTime(e.duracion)}
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
