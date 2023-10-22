import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  theme: "Light",
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useContextTheme = () => useContext(ThemeContext);
