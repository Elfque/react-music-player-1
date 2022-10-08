import { useState, useEffect } from "react";
import Loader from "./Loader";
import Song from "./Song";

const WorldTop = ({ setIndex, playing, setPlay, currentSong, setSong }) => {
  const [countryTop, setCountryTop] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      "https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=NG",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCountryTop(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const newCountryTop = countryTop && countryTop.filter((arr) => arr.images);

  return (
    <div className="world">
      <div>This are the top songs in your country</div>
      <div className="text-center">{loading && <Loader />}</div>
      <div className="songs">
        {newCountryTop &&
          newCountryTop.map((song, index) => (
            <Song
              key={song.key}
              index={index}
              song={song}
              setIndex={setIndex}
              songs={newCountryTop}
              playing={playing}
              currentSong={currentSong}
              setPlay={setPlay}
              setSong={setSong}
            />
          ))}
      </div>
    </div>
  );
};

export default WorldTop;
