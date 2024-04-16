import videoBg from "../assets/videoBg.mp4";
import classes from "../styles/Content.module.css";
import cityData from "../assets/cities.json";
import { useState } from "react";
import { Input } from "@mantine/core";
import { Link } from "react-router-dom";

const ContentPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  // Filter cities based on search term
  const filteredCities = cityData.cities.filter((city) =>
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
        <Input
          radius="md"
          placeholder="Search for cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />

        <div className={classes.cityGrid}>
          {cityData &&
            filteredCities.map((city) => (
              <div key={city.id} className={classes.cityBlock}>
                <Link to={`/city/${city.id}`}>
                  <img
                    src={city.picture[0].src}
                    alt={`Image of ${city.cityname}`}
                  ></img>
                  <div className={classes.cityName}>{city.cityname}</div>
                  <div className={classes.cityCountry}>{city.country}</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContentPage;
