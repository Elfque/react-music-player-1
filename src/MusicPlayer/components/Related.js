import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

const Related = ({ track }) => {
  return (
    <div className="related_card">
      <div className="related_left">
        <img src={track.images.coverart} alt="" width={"100px"} />
        <div>{track.title}</div>
      </div>
      <FaPlayCircle className="relate_play" />
    </div>
  );
};

export default Related;
