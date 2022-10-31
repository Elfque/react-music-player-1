import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

const PlayPause = ({ isEqual, playing, handlePlay, handlePause }) => {
  return isEqual && playing ? (
    <FaPauseCircle onClick={handlePause} />
  ) : (
    <FaPlayCircle onClick={handlePlay} />
  );
};

export default PlayPause;
