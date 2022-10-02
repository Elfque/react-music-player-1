import { useRef } from "react";
import { FaForward, FaBackward, FaPause, FaPlay } from "react-icons/fa";

const Player = ({ playing, playPause, currentSong }) => {
  const rangeRef = useRef();
  const volumeRef = useRef();

  return (
    <div className="player">
      <div className="player_part">
        <div className="song_details">
          <img
            src={currentSong?.images?.coverart}
            alt=""
            className="current_song_cover"
          />
          <div>
            <div className="song_name">
              {currentSong ? currentSong.title : "Song Name"}
            </div>
            <div className="song_artist">
              {currentSong.artists
                ? currentSong?.artists[0].alias
                : "Artist Name"}
            </div>
          </div>
        </div>
        <div className="main_controls d-flex flex-column align-items-center justify-content-center">
          <div className="controls">
            <FaBackward />
            {playing ? (
              <FaPause onClick={playPause} />
            ) : (
              <FaPlay onClick={playPause} />
            )}
            <FaForward />
          </div>
          <div className="range">
            <input
              type="range"
              name=""
              id=""
              ref={rangeRef}
              className="current_time"
            />
          </div>
        </div>
        <div className="volume">
          <input type="range" name="" id="" ref={volumeRef} />
        </div>
      </div>
    </div>
  );
};

export default Player;
