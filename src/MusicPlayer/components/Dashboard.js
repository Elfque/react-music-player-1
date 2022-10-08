import { useEffect, useState, useRef } from "react";
import { genres } from "../constants";
import Loader from "./Loader";
import Song from "./Song";

const Dashboard = ({ setIndex, playing, setPlay, currentSong, setSong }) => {
  const [genreArray, setGenreArray] = useState([]);
  const [fetchLink, setFetchLink] = useState(
    "https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=POP"
  );
  const [loading, setLoading] = useState(false);
  const genreRef = useRef();

  let genreTitle = genreRef.current && genreRef.current.value;

  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      params: { genre_code: genreRef.current.value },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(fetchLink, options)
      .then((response) => response.json())
      .then((response) => {
        setGenreArray(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [fetchLink]);

  const changeGenre = () => {
    setFetchLink(
      `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genreRef.current.value}`
    );
    console.log(fetchLink);
  };

  return (
    <div className="dashboard">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center  my-3 px-4">
          <h1>Discover {genreTitle}</h1>
          <select name="" id="" ref={genreRef} onChange={changeGenre}>
            {genres.map((gen) => (
              <option value={gen.value} key={gen.title}>
                {gen.title}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">{loading && <Loader />}</div>
        {/* {!loading && ( */}
        <div className="songs mt-3">
          {genreArray &&
            genreArray.map((song, index) => (
              <Song
                key={song.key}
                index={index}
                song={song}
                setIndex={setIndex}
                songs={genreArray}
                playing={playing}
                currentSong={currentSong}
                setPlay={setPlay}
                setSong={setSong}
              />
            ))}
        </div>
        {/* // )} */}
      </div>
    </div>
  );
};

export default Dashboard;
