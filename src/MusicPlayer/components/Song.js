import { FaPlayCircle } from "react-icons/fa";

const Song = ({ song, index, setCurrent, songs, playing }) => {
  const artist = song.artists.map((art) => art.alias);
  const handlePlay = () => {
    setCurrent(songs[index]);
  };
  return (
    <div className="song">
      <div className="position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center overlay">
          <FaPlayCircle onClick={handlePlay} />
        </div>
        <img src={song.images.coverart} alt="" className="cover_pic" />
      </div>
      <div className="song_title">{song.title}</div>
      <div className="song_artist">{artist.join(" ")}</div>
    </div>
  );
};

export default Song;
