import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";

const Related = ({
  track,
  current,
  setIndex,
  setPlay,
  playing,
  setSong,
  index,
  tracks,
}) => {
  const handlePlay = () => {
    setSong(tracks);
    setIndex(index);
    setPlay(true);
  };

  const handlePause = () => {
    setPlay(false);
  };

  return (
    <div className="related_card">
      <div className="related_left">
        <img src={track.images?.coverart} alt="" width={"100px"} />
        <div>
          {/* <div className="fetch" onClick={() => setNewFetch(track.key)}> */}
          <Link to={`/song/${track.key}`}>{track.title}</Link>
          {/* </div> */}
          <div className="artist">
            {track.artists.map((art) => art.alias).join(" , ")}
          </div>
        </div>
      </div>
      <div className="relate_right fs-2">
        <PlayPause
          isEqual={current === track ? true : false}
          playing={playing}
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
      </div>
    </div>
  );
};

export default Related;
