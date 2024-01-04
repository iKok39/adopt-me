import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./components/Details";
import SearchParams from "./components/SearchParams";
import { useState } from "react";
import AdoptedPetContext from "./lib/AdoptedPetContext";
import ThemeContext from "./lib/ThemeContext";
import Switch from "react-switch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <div className="theme" id={theme}>
              <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
              <Switch onChange={toggleTheme} checked={theme === "dark"} />
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </div>
          </AdoptedPetContext.Provider>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
