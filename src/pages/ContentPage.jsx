import videoBg from "../assets/videoBg.mp4";
import classes from "../styles/Content.module.css";

import { useState, useContext } from "react";
import { Input } from "@mantine/core";
import { Link } from "react-router-dom";

import { CityContext } from "../contexts/CityContext";

const ContentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritedCities, setFavoritedCities] = useState(new Set());

  const { cities } = useContext(CityContext);

  const toggleFavorite = (cityId) => {
    setFavoritedCities((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(cityId)) {
        newFavs.delete(cityId);
      } else {
        newFavs.add(cityId);
      }
      return newFavs;
    });
  };

  // Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.cityname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={classes.container}>
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          className={classes.video}
        ></video>

        <div className={classes.cityText}>
          <h1>Welcome to Dream City Finder</h1>
        </div>
        <p>Seach For City Name</p>
        <Input
          radius="md"
          placeholder="Search for cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />

        <div className={classes.cityGrid}>
          {cities &&
            filteredCities.map((city) => (
              <div key={city.id} className={classes.cityBlock}>
                <Link to={`/city/${city.id}`}>
                  <img
                    src={city.picture[0].src}
                    alt={`Image of ${city.cityname}`}
                  ></img>
                  <div className={classes.cityName}>{city.cityname}</div>
                  <div className={classes.cityCountry}>{city.country}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill={favoritedCities.has(city.id) ? "red" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={classes.heartIcon}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(city.id);
                    }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentPage;
