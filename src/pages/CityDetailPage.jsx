import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cityData from "../assets/cities.json";

const CityDetailPage = () => {
  const [city, setCity] = useState(cityData[0]);

  // React Router hook for navigation. We use it for the back button. You can leave this as it is.
  const navigate = useNavigate();
  //const { cityId } = useParams();

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      {city && (
        <>
          <img
            src={city.picture[0].src}
            alt="City Image"
            height="300px"
            width="auto"
          />
          <h3>{city.cityname}</h3>
          <p>{city.avgScore}</p>
          <p>Country: {city.country}</p>
          <p>Continent: {city.continent}</p>
          <p>Cost of Living: {city.costOfLiving}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default CityDetailPage;
