import { useState, useContext, createContext } from "react";

export const ThemeContext = createContext();

export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}

export default function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const myThemes = {
    light: {
      background: "#fff",
      color: "purple",
    },
    dark: {
      background: "#292929",
      color: "deeppink",
    },
  };

  const providerValue = {
    themeStyle: myThemes[theme],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {props.children}
    </ThemeContext.Provider>
  );
}
