import { createContext, useState, useEffect } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  const fetchDataCity = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cities`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  useEffect(() => {
    fetchDataCity();
  }, []);

  return (
    <CityContext.Provider value={{ cities }}>{children}</CityContext.Provider>
  );
};
