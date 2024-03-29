import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DisplayRegistroActual from "./DisplayRegistroActual";
import NuevoRegistro from "./NuevoRegistro";
import BotonesRegistro from "./BotonesRegistro";
import RegistrosPrevios from "./RegistrosPrevios";
import Stats from "./Stats";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CardRegistros from "./CardRegistros";
import NavBar from "./NavBar";
import ThemeProvider from "./ThemeProvider";

function App() {
  const supabaseUrl = "https://bsjbjzhvpxupvicelazp.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [midata, setMidata] = useState();
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [mostrarRegistrosPrevios, setMostrarRegistrosPrevios] = useState(false);
  const [mostrarStats, setMostrarStats] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    titulo: "",
    inicio: "",
    fin: "",
    tags: "",
    tagsArray: [],
    color: "black",
  });

  useEffect(() => {
    async function sb() {
      try {
        let { data, error } = await supabase.from("test1").select("*");

        //TODO: revisar, mejor ordenar por fecha.
        data.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          } else if (a.id < b.id) {
            return 1;
          } else {
            return 0;
          }
        });

        setMidata(data);
      } catch {
        console.error("Hubo un error: " + error.message);
      }
    }
    sb();
  }, []);

  function handleRec(event) {
    if (event.target.name === "rec") {
      setIsRegistrando(true);

      setNuevoRegistro((prev) => {
        return {
          ...prev,
          inicio: new Date(),
          titulo: prev.titulo === "" ? "Sin título" : prev.titulo,
        };
      });
    }
  }

  function handleStop(event) {
    async function guardar() {
      try {
        const { data, error } = await supabase
          .from("test1")
          .insert({
            titulo: nuevoRegistro.titulo,
            inicio: nuevoRegistro.inicio,
            fin: new Date(),
            tags: nuevoRegistro.tags,
            color: nuevoRegistro.color,
          })
          .select();

        setMidata((prev) => {
          return [data[0], ...prev];
        });
      } catch {
        console.error("Hubo un error: " + error.message);
      }
    }
    guardar();

    setIsRegistrando(false);
  }
  function handleBorrar(event) {
    async function borrar(elementKey) {
      try {
        const { error } = await supabase
          .from("test1")
          .delete()
          .eq("id", event.currentTarget.dataset.key);

        setMidata((prev) =>
          prev.filter((e) => parseInt(e.id) !== parseInt(elementKey))
        );
      } catch {
        console.error("Hubo un error: " + error.message);
      }
    }

    // hay que pasar la Key como parametro porque sino con currentTarget
    //no la puede tomar desde dentro de la arrow function (en cambio con target sí lo hacía)
    borrar(event.currentTarget.dataset.key);
  }

  function RegistrosPreviosContainer() {
    return (
      <>
        <div className="flex flex-row items-center gap-2 pb-1">
          <div className="text-sm">Registros Previos</div>
          {!mostrarRegistrosPrevios && (
            <button
              className="flex flex-row text-fuchsia-700"
              onClick={() => setMostrarRegistrosPrevios(true)}
            >
              <FaEye></FaEye>
              <span className="text-xs pl-1">Mostrar</span>
            </button>
          )}
          {mostrarRegistrosPrevios && (
            <button
              className="flex flex-row text-fuchsia-700"
              onClick={() => setMostrarRegistrosPrevios(false)}
            >
              <FaEyeSlash></FaEyeSlash>
              <span className="text-xs pl-1+">Ocultar</span>
            </button>
          )}
        </div>
        {!mostrarRegistrosPrevios && (
          <div style={{ borderTop: "1px solid dodgerblue" }}></div>
        )}
        <div>
          {midata && mostrarRegistrosPrevios && (
            <RegistrosPrevios
              midata={midata}
              handleBorrar={handleBorrar}
            ></RegistrosPrevios>
          )}
        </div>
      </>
    );
  }

  function StatsContainer() {
    return (
      <>
        <div className="flex flex-row items-center gap-2 pb-1">
          <div className="text-sm">Estadísticas</div>
          {!mostrarStats && (
            <button
              className="flex flex-row text-fuchsia-700"
              onClick={() => setMostrarStats(true)}
            >
              <FaEye></FaEye>
              <span className="text-xs pl-1">Mostrar</span>
            </button>
          )}
          {mostrarStats && (
            <button
              className="flex flex-row text-fuchsia-700"
              onClick={() => setMostrarStats(false)}
            >
              <FaEyeSlash></FaEyeSlash>
              <span className="text-xs pl-1+">Ocultar</span>
            </button>
          )}
        </div>
        {!mostrarStats && (
          <div style={{ borderTop: "1px solid dodgerblue" }}></div>
        )}
        <div>{midata && mostrarStats && <Stats midata={midata}></Stats>}</div>
      </>
    );
  }

  function Footer() {
    return (
      <div className="flex flex-row justify-center mt-10">
        <div
          className="p-2 mt-1   shadow-sm shadow-gray-300 text-xs flex flex-row justify-center"
          style={{
            width: "600px",
            color: "dodgerblue",
            border: "1px solid dodgerblue",
          }}
        >
          <span className="px-1">Federico Holc -</span>
          <a href="https://github.com/fedeholc" target="_blank">
            github.com/fedeholc
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{ height: "calc(100vh - 100px)" }}
        className="flex flex-col items-center overflow-auto"
      >
        <ThemeProvider>
          <NavBar></NavBar>
        </ThemeProvider>
        <div className="mt-8 flex flex-col items-center">
          {isRegistrando && (
            <CardRegistros>
              <DisplayRegistroActual
                isRegistrando={isRegistrando}
                nuevoRegistro={nuevoRegistro}
              ></DisplayRegistroActual>
              <BotonesRegistro
                handleRec={handleRec}
                handleStop={handleStop}
                isRegistrando={isRegistrando}
              ></BotonesRegistro>
            </CardRegistros>
          )}
          {!isRegistrando && midata && (
            <CardRegistros>
              <NuevoRegistro
                handleRec={handleRec}
                nr={nuevoRegistro}
                setNR={setNuevoRegistro}
                isRegistrando={isRegistrando}
                midata={midata}
              ></NuevoRegistro>
              <BotonesRegistro
                handleRec={handleRec}
                handleStop={handleStop}
                isRegistrando={isRegistrando}
              ></BotonesRegistro>
            </CardRegistros>
          )}
          <br /> <br />
          <div style={{ minWidth: "500px" }}>
            <RegistrosPreviosContainer />
          </div>
          <br />
          <div style={{ minWidth: "500px" }}>
            <StatsContainer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
