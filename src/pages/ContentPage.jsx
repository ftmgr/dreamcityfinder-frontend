import videoBg from "../assets/videoBg.mp4";
import classes from "../styles/Content.module.css";
import cityData from "../assets/cities.json";

const ContentPage = () => {
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
        <div className={classes.cityGrid}>
          {cityData.cities.map((city, index) => (
            <div key={city.id} className={classes.cityBlock}>
              <img
                src={city.picture[0].src}
                alt={`Image of ${city.cityname}`}
              />
              <div className={classes.cityName}>{city.cityname}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentPage;
