import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const Song = ({
  song,
  index,
  setIndex,
  songs,
  playing,
  currentSong,
  setPlay,
  setSong,
}) => {
  const artist = song.artists.map((art) => art.alias);
  const handlePlay = () => {
    setSong(songs);
    setIndex(index);
    setPlay(true);
    console.log(currentSong);
  };

  const handlePause = () => {
    setPlay(false);
  };

  return (
    <div className="song">
      <div className="position-relative">
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center overlay ${
            currentSong === song ? "half" : "zero"
          }`}
        >
          <PlayPause
            isEqual={currentSong === song ? true : false}
            playing={playing}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        </div>
        <img src={song.images.coverart} alt="" className="cover_pic" />
      </div>
      <div className="song_title">
        <Link to={`song/${song.key}`}>{song.title}</Link>
      </div>
      <div className="song_artist">{artist.join(" ")}</div>
    </div>
  );
};

export default Song;
