export default function CardRegistros(props) {
  return (
    <div className="flex flex-col items-end gap-4 p-6 border rounded-md shadow-sm shadow-gray-300">
      {props.children}
    </div>
  );
}
