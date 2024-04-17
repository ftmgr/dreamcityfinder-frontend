import { useState, useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextInput } from "@mantine/core";

const AdminCreateCityPage = () => {
  const { addCity } = useContext(CityContext);
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [avgScore, setAvgScore] = useState(0);
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [maxTemperature, setMaxTemperature] = useState("");
  const [avgTemperature, setAvgTemperature] = useState("");

  const [minHumidity, setMinHumidity] = useState("");
  const [maxHumidity, setMaxHumidity] = useState("");
  const [avgHumidity, setAvgHumidity] = useState("");
  const [costOfLiving, setCostOfLiving] = useState(0);
  const [pictureSrc, setPictureSrc] = useState("");

  // Function to handle form submission
  const handleCreateCity = () => {
    const newCity = {
      cityname: cityName,
      avgScore: parseInt(avgScore),
      country: country,
      continent: continent,
      costOfLiving: parseInt(costOfLiving),
      weather: [
        {
          temperature: [
            parseInt(minTemperature),
            parseInt(maxTemperature),
            parseInt(avgTemperature),
          ],
          humidity: [
            parseInt(minHumidity),
            parseInt(maxHumidity),
            parseInt(avgHumidity),
          ],
        },
      ],
      picture: [{ src: pictureSrc, pictureName: `${cityName} image` }],
    };
    addCity(newCity);
    navigate("/admin");
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{ maxWidth: 400, margin: "2rem auto", marginTop: "100px" }}
    >
      <TextInput
        label="City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <TextInput
        label="Average Score"
        type="number"
        value={avgScore}
        onChange={(e) => setAvgScore(e.target.value)}
      />
      <TextInput
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextInput
        label="Continent"
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
      />
      <TextInput
        label="Cost of Living"
        type="number"
        value={costOfLiving}
        onChange={(e) => setCostOfLiving(e.target.value)}
      />
      <TextInput
        label="Image URL"
        value={pictureSrc}
        onChange={(e) => setPictureSrc(e.target.value)}
      />
      <TextInput
        label="Minimum Temperature"
        type="number"
        value={minTemperature}
        onChange={(e) => setMinTemperature(e.target.value)}
      />
      <TextInput
        label="Maximum Temperature"
        type="number"
        value={maxTemperature}
        onChange={(e) => setMaxTemperature(e.target.value)}
      />
      <TextInput
        label="Average Temperature"
        type="number"
        value={avgTemperature}
        onChange={(e) => setAvgTemperature(e.target.value)}
      />

      <TextInput
        label="Minimum Humidity"
        type="number"
        value={minHumidity}
        onChange={(e) => setMinHumidity(e.target.value)}
      />
      <TextInput
        label="Maximum Humidity"
        type="number"
        value={maxHumidity}
        onChange={(e) => setMaxHumidity(e.target.value)}
      />
      <TextInput
        label="Average Humidity"
        type="number"
        value={avgHumidity}
        onChange={(e) => setAvgHumidity(e.target.value)}
      />
      <Button
        onClick={handleCreateCity}
        variant="filled"
        style={{ marginTop: "1rem" }}
      >
        Create City
      </Button>
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        style={{ marginTop: "1rem" }}
      >
        Cancel
      </Button>
    </Card>
  );
};

export default AdminCreateCityPage;
