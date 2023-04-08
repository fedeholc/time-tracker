export default function BotonesRegistro(props) {
  return (
    <div className="flex flex-row gap-4">
      <button
        name="rec"
        onClick={props.handleRec}
        className={
          props.isRegistrando
            ? "ring-2    rounded-sm ring-red-200  bg-white  text-gray-400   px-2 py-1   "
            : "ring-2 hover:bg-white  rounded-sm ring-red-700  bg-red-700  text-white hover:text-red-700 px-2 py-1  hover:ring-red-600 "
        }
        disabled={props.isRegistrando}
      >
        REC
      </button>

      <button
        name="stop"
        onClick={props.handleStop}
        className={
          !props.isRegistrando
            ? "ring-2    rounded-sm ring-blue-200  bg-white  text-gray-400   px-2 py-1  mr-1 "
            : "ring-2 hover:bg-white  rounded-sm ring-blue-700  bg-blue-700  text-white hover:text-blue-700 px-2 py-1  hover:ring-blue-600 "
        }
        disabled={!props.isRegistrando}
      >
        Stop
      </button>
    </div>
  );
}
