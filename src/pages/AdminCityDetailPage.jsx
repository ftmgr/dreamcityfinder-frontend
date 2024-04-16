import { useContext, useState } from "react";
import { CityContext } from "../contexts/CityContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Image, Text, TextInput } from "@mantine/core";

const CityDetailPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();

  const { cities, updateCity, deleteCity } = useContext(CityContext);

  const city = cities.find((city) => city.id.toString() === cityId);

  const [cityName, setCityName] = useState(city?.cityname);
  const [avgScore, setAvgScore] = useState(city?.avgScore);
  const [country, setCountry] = useState(city?.country);
  const [continent, setContinent] = useState(city?.continent);
  const [costOfLiving, setCostOfLiving] = useState(city?.costOfLiving);

  const updateCityData = () => {
    const updatedCity = {
      cityname: cityName,
      avgScore: avgScore,
      country: country,
      continent: continent,
      costOfLiving: costOfLiving,
    };
    updateCity(city.id, updatedCity);
  };

  const deleteCityData = () => {
    deleteCity(city.id);
  };

  if (!city) {
    return <Text>No city data available.</Text>;
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{ maxWidth: 400, margin: "2rem auto", marginTop: "100px" }}
    >
      <Card.Section>
        <Image
          src={city.picture[0].src}
          height={160}
          alt={`Image of ${cityName}`}
          fit="cover"
        />
      </Card.Section>

      <TextInput
        label="City Name"
        value={cityName}
        onChange={(event) => setCityName(event.target.value)}
      />
      <TextInput
        label="Average Score"
        value={avgScore}
        onChange={(event) => setAvgScore(event.target.value)}
      />
      <TextInput
        label="Country"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      />
      <TextInput
        label="Continent"
        value={continent}
        onChange={(event) => setContinent(event.target.value)}
      />
      <TextInput
        label="Cost of Living"
        value={costOfLiving}
        onChange={(event) => setCostOfLiving(event.target.value)}
      />

      <Button
        variant="outline"
        color="blue"
        mt="md"
        onClick={() => updateCityData()}
      >
        Update City
      </Button>
      <Button
        variant="outline"
        color="red"
        mt="md"
        onClick={() => deleteCityData()}
      >
        Delete City
      </Button>
      <Button
        variant="outline"
        color="blue"
        mt="md"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Card>
  );
};

export default CityDetailPage;
