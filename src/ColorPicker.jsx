import { useState } from "react";
export default function ColorPicker(props) {
  const [colores, setColores] = useState([
    "Purple",
    "green",
    "Orange",
    "pink",
    "darkblue",
    "black",
  ]);
  const [selected, setSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  function handleColor(event) {
    setSelected((prev) =>
      prev.map((e, i) => {
        console.log(i);
        if (i === parseInt(event.target.dataset.colorindex)) {
          props.handleChangeColor(colores[i]);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  return (
    <>
      <div className="flex flex-row items-center">
        {colores.map((e, i) => {
          return (
            <div key={i} className="flex">
              {selected[i] ? (
                <button
                  className="w-4 h-4 mx-1   ring-1 ring-black  rounded-full "
                  style={{ backgroundColor: `${e}` }}
                  data-colorindex={i}
                  onClick={handleColor}
                ></button>
              ) : (
                <button
                  className="w-3 h-3 mx-1 hover:ring-1 hover:ring-black hover:rounded-full  "
                  style={{ backgroundColor: `${e}` }}
                  data-colorindex={i}
                  onClick={handleColor}
                ></button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
