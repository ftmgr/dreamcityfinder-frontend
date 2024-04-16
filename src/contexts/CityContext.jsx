import { createContext, useState, useEffect } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  const fetchDataCity = async () => {
    try {
      const response = await fetch("http://localhost:4000/cities");
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
