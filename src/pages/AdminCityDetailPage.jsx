import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Image, Text } from "@mantine/core";

const CityDetailPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();

  const { cities } = useContext(CityContext);

  const city = cities.find((city) => city.id.toString() === cityId);

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
          alt={`Image of ${city.cityname}`}
          fit="cover"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        {city.cityname}
      </Text>

      <Text size="sm">Average Score: {city.avgScore}</Text>
      <Text size="sm">Country: {city.country}</Text>
      <Text size="sm">Continent: {city.continent}</Text>
      <Text size="sm">Cost of Living: {city.costOfLiving}</Text>

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
