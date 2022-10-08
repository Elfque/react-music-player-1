import { useEffect, useState } from "react";
import Loader from "./Loader";
import Song from "./Song";
const TopSongs = ({ setIndex, playing, setPlay, currentSong, setSong }) => {
  const [topSongs, setTopSongs] = useState(null);
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
    fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
      .then((response) => response.json())
      .then((response) => {
        setTopSongs(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="top_songs">
      <h2>Discover Top Songs in the world</h2>
      <div className="text-center">{loading && <Loader />}</div>
      {!loading && (
        <div className="songs">
          {topSongs &&
            topSongs.map((song, index) => (
              <Song
                key={song.key}
                index={index}
                song={song}
                setIndex={setIndex}
                songs={topSongs}
                playing={playing}
                currentSong={currentSong}
                setPlay={setPlay}
                setSong={setSong}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TopSongs;
