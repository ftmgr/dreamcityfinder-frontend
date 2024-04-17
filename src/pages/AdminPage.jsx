import { useState, useContext } from "react";

import videoBg from "../assets/videoBg.mp4";
import classes from "../styles/Content.module.css";
import { Input, Button } from "@mantine/core";
import { Link } from "react-router-dom";

import { CityContext } from "../contexts/CityContext";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { cities } = useContext(CityContext);

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
        <div className={classes.controls}>
          <Input
            radius="md"
            placeholder="Search for cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchInput}
          />
          <Link to="/create-city">
            <Button variant="outline" className={classes.createButton}>
              Create City
            </Button>
          </Link>
        </div>

        <div className={classes.cityGrid}>
          {cities &&
            filteredCities.map((city) => (
              <div key={city.id} className={classes.cityBlock}>
                <Link to={`/admin/city/${city.id}`}>
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

export default AdminPage;
