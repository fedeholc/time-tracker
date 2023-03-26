import { useState, useEffect } from "react";
import {
  FaChevronCircleDown,
  FaWindowClose,
  FaPlusCircle,
} from "react-icons/fa";
import ColorPicker from "./ColorPicker";

export default function NuevoRegistro(props) {
  const [showModal, setShowModal] = useState(false);
  const [posx, setPosx] = useState();
  const [posy, setPosy] = useState();
  const [AllTags, setAllTags] = useState(cargarTags);
  const TAGS_MODAL_WIDTH = 250;

  // TODO: que no se puedan agregar tags duplicadas, que si se agregan con comas las divida.

  // * Carga inicialmente todas las tags para usar en el seleccionador de tags
  function cargarTags() {
    // en la base de datos las tags se guardan en una sola cadena separadas por comas
    // para crear el array con todas las tags hay que recorrer cada registro y
    // para cada cadena de tags separarlas
    let myTags = [];
    props.midata.forEach((e) => {
      e.tags.split(",").forEach((tag) => {
        tag ? myTags.push(tag) : null;
      });
    });

    // elimina las tags duplicadas y vacías
    myTags = myTags.filter((e, i) => myTags.indexOf(e) === i && e !== "");

    // paso del array a objeto que tiene la tag y el checked
    // como es la carga inicial van todas en false
    // si fuera para editar un registro anterior habría que poner
    // así: checked: props.nr.tagsArray.indexOf(e) === -1 ? false : true,
    myTags = myTags.map((e) => {
      return {
        tag: e,
        checked: false,
      };
    });

    return myTags;
  }

  // * abre el modal para seleccionar tags
  function openModal(e) {
    let tagsPlace = document.querySelector("[name='tags']");
    setPosx(
      tagsPlace.offsetLeft - TAGS_MODAL_WIDTH + tagsPlace.offsetWidth + "px"
    );
    setPosy(tagsPlace.offsetTop + "px");
    setShowModal(true);
  }

  // * maneja los cambios en los inputs (pero no el de tags)
  function handleChange(event) {
    props.setNR((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChangeColor(newColor) {
    props.setNR((prev) => {
      return {
        ...prev,
        color: newColor,
      };
    });
  }

  //* se le pasa el array de tags (solo tags sin checked por eso antes las filtro con tagsChecked)
  //* y devuelve una cadena con las tags separadas por comas
  //* la uso en handleTags y el useeffect que se dispara cuando hay una tag nueva
  function tagsToString(tagsArray) {
    let tagsString = "";
    tagsArray.map((element) => (tagsString += "," + element));
    return tagsString.slice(1);
  }

  //* se le pasa el array de tags y devuelve solo las checked
  function tagsChecked(allTagsObject) {
    let tagsChecked = [];
    allTagsObject.forEach((element) =>
      element.checked ? tagsChecked.push(element.tag) : null
    );
    return tagsChecked;
  }

  // * maneja los cambios en la selección de tags
  function handleTags(event) {
    // * cambia el valor del check del tag seleccionado o deseleccionado para actualizar el state
    let tags = AllTags.map((element) => {
      if (element.tag === event.target.dataset.tag) {
        return { tag: element.tag, checked: event.target.checked };
      } else {
        return { tag: element.tag, checked: element.checked };
      }
    });
    setAllTags(tags);

    // * actualiza el state del nuevo registro creando la cadena de tags y el array de tags
    props.setNR((prev) => {
      return {
        ...prev,
        tags: tagsToString(tagsChecked(tags)),
        tagsArray: tagsChecked(tags),
      };
    });
  }

  // * se dispara cuando se agrega una tag nueva y se modifica el state de AllTags
  // * para que se actualicen las tags del nuevo registro
  useEffect(() => {
    props.setNR((prev) => {
      return {
        ...prev,
        tags: tagsToString(tagsChecked(AllTags)),
        tagsArray: tagsChecked(AllTags),
      };
    });
  }, [AllTags]);

  // se dispara cuando se guarda un registro nuevo para que se actualicen todas las tags
  // y aparezcan en el selector de tags
  useEffect(() => {
    setAllTags(cargarTags);
  }, [props.midata]);

  function TagsModal() {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: posy,
            left: posx,
            width: `${TAGS_MODAL_WIDTH}px`,
          }}
          className="bg-white z-50 border rounded-md shadow-sm shadow-gray-400"
        >
          <div className=" pt-1 pl-2 flex flex-row items-baseline justify-between border-b pb-1">
            <span name="tags" style={{ fontSize: "1rem" }}>
              Tags
            </span>
            <FaWindowClose
              onClick={() => setShowModal(false)}
              className="ml-1 mr-2 hover: cursor-pointer"
            />
          </div>

          <div className="pl-4 flex flex-row items-baseline justify-between mt-2">
            <input
              style={{
                border: "0",
                borderBottom: `1px solid rgba(192,38,211, 40%)`,
                paddingLeft: "0.3rem",
                marginBottom: "0.5rem",
                marginRight: "0.5rem",
                width: "150px",
              }}
              type="text"
              name="tagsinput"
              autoFocus
              className="border-2 "
            />

            <button
              className="mr-4"
              onClick={() => {
                let tagsInput =
                  document.querySelector("[name='tagsinput']").value;
                setAllTags((prev) => [
                  ...prev,
                  {
                    tag: tagsInput,
                    checked: true,
                  },
                ]);
                document.querySelector("[name='tagsinput']").value = "";
                document.querySelector("[name='tagsinput']").focus();
              }}
            >
              <FaPlusCircle className="inline" />
              <span className="text-xs"> Añadir</span>
            </button>
          </div>

          <div className="h-28 overflow-auto">
            {AllTags.map((e, i) => {
              return (
                <div key={i} className="pl-4 text-sm flex flex-row">
                  <input
                    className="mr-1"
                    type="checkbox"
                    onChange={handleTags}
                    checked={e.checked}
                    data-tag={e.tag}
                    name={e.tag}
                  />
                  {e.tag}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              className="ring-2 hover:bg-white ring-blue-700  rounded-md  e  bg-blue-700  text-white hover:text-blue-700 px-2 py-1  text-sm hover:ring-blue-700 mb-3 ml-2 mt-2"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
        <div
          onClick={() => setShowModal(false)}
          className="  fixed inset-0 z-40 "
        ></div>
      </>
    );
  }

  return (
    <div className="">
      <div className="flex flex-col items-end">
        {/* inputs */}
        <div className="mb-3">
          <input
            style={{
              paddingLeft: "0.3rem",
              border: "0",
              width: "350px",
              fontSize: "2rem",
              borderBottom: `1px solid rgba(192,38,211, 100%)`,
            }}
            type="text"
            name="titulo"
            value={props.nr.titulo}
            onChange={handleChange}
            placeholder="Título..."
          />
        </div>

        <div className="mb-1 flex flex-row justify-between  items-center    w-full">
          <div className="flex flex-row items-center">
            <span style={{ fontSize: "0.9rem" }}>Color:</span>
            <ColorPicker handleChangeColor={handleChangeColor}></ColorPicker>
          </div>

          <span
            className="hover: cursor-pointer"
            name="tags"
            onClick={openModal}
            style={{ fontSize: "0.9rem" }}
          >
            Tags
            <FaChevronCircleDown className="ml-1 inline" />
          </span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.7)" }}>
          {props.nr.tags}
        </div>

        {showModal ? <TagsModal /> : null}
      </div>
    </div>
  );
}
