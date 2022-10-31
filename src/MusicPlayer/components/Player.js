import {
  FaForward,
  FaBackward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from "react-icons/fa";
import { BsArrowRepeat, BsShuffle } from "react-icons/bs";

const Player = ({
  playing,
  playPause,
  currentSong,
  rangeRef,
  playNext,
  playPrevious,
  current,
  duration,
  setAudioVolume,
  setCurrent,
  setShuffle,
  setRepeat,
  repeat,
  shuffle,
  decideTime,
}) => {
  const playRepeat = () => {
    setRepeat(!repeat);
  };
  const setPlayTime = () => {
    setCurrent(rangeRef.current.value);
    decideTime();
  };
  return (
    <div className="player">
      <div className="player_part">
        <div className="song_details">
          <img
            src={currentSong?.images?.background}
            alt=""
            className="current_song_cover"
          />
          <div>
            <div className="song_name text-truncate">
              {currentSong ? currentSong.title : "Song Name"}
            </div>
            <div className="song_artist text-truncate">
              {currentSong.artists
                ? currentSong?.artists[0].alias
                : "Artist Name"}
            </div>
          </div>
        </div>
        <div className="main_controls">
          <div className="controls">
            <div className={`spec_control ${shuffle ? "active" : ""}`}>
              <BsShuffle onClick={() => setShuffle(!shuffle)} />
            </div>
            <FaBackward onClick={playPrevious} />
            {playing ? (
              <FaPause onClick={playPause} />
            ) : (
              <FaPlay onClick={playPause} />
            )}
            <FaForward onClick={playNext} />
            <div className={`spec_control ${repeat ? "active" : ""}`}>
              <BsArrowRepeat onClick={playRepeat} />
            </div>
          </div>
        </div>
        <div className="volume">
          <FaVolumeUp />
          <input
            type="range"
            defaultValue={100}
            onChange={(e) => setAudioVolume(e.target.value / 100)}
            className="volume_range"
          />
        </div>
        <div className="range">
          <div className="time">{current}</div>
          <input
            type="range"
            ref={rangeRef}
            defaultValue={0}
            className="current_time"
            onChange={setPlayTime}
          />
          <div className="time">{duration}</div>
        </div>
      </div>
    </div>
  );
};

export default Player;
