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
  const handlePlay = () => {
    setSong(songs);
    setIndex(index);
    setPlay(true);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const formatText = (text) => {
    const area = document.createElement("textarea");
    area.value = text;
    return area.value;
  };

  return (
    <div className="song">
      <div className="card_photo">
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
        <img src={song.images?.coverart} alt="" className="cover_pic" />
      </div>
      <div className="song_title text-truncate">
        <Link to={`/song/${song.key}`}>{song.title}</Link>
      </div>
      <div className="song_artist">
        {/* {artist?.join(" ")} */}
        {song.artists?.map((artist, i) => (
          <Link to={`/artist/${artist.adamid}`} key={artist.adamid}>
            {formatText(artist.alias)}
            {i !== song.artists.length - 1 ? " & " : ""}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Song;
