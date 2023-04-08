import { useThemeContext } from "./ThemeProvider";

export default function NavBar() {
  const tema = useThemeContext();

  return (
    <div
      className="border-2 mt-1 border-fuchsia-600  shadow-sm shadow-gray-300 text-fuchsia-900 text-lg flex flex-row items-center"
      style={{ width: "600px" }}
    >
      <div className="w-full p-2" onClick={tema.toggleTheme} style={tema.themeStyle}>Time Tracker </div>
    </div>
  );
}
