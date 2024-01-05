import React from "react";
import Switch from "react-switch";

const ThemeSwitch = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  return (
    <div className="theme">
      <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <Switch onChange={toggleTheme} checked={theme === "dark"} />
    </div>
  );
};

export default ThemeSwitch;
