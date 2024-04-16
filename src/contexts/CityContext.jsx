import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

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

  const updateCity = async (id, updatedCityData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cities/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCityData),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCities(
        cities.map((city) => (city.id === id ? { ...city, ...data } : city))
      );
    } catch (error) {
      console.error("Failed to update city:", error);
    }
  };

  const deleteCity = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities(cities.filter((city) => city.id !== id));
      Navigate("/"); // Redirect user after deletion
    } catch (error) {
      console.error("Failed to delete city:", error);
    }
  };

  useEffect(() => {
    fetchDataCity();
  }, []);

  return (
    <CityContext.Provider value={{ cities, updateCity, deleteCity }}>
      {children}
    </CityContext.Provider>
  );
};
