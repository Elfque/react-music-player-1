import { FaGlobe, FaGlobeAfrica, FaSlidersH } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="side">
        <div className="music_logo">
          <img src="./logo.png" alt="" />
        </div>
        <div className="Links">
          <div className="link">
            <FaSlidersH />
            <Link to={"/"}>Genres</Link>
          </div>
          <div className="link">
            <FaGlobe />
            <Link to={"/top"}>World Top Songs</Link>
          </div>
          <div className="link">
            <FaGlobeAfrica />
            <Link to={"/world"}>Top Song in your Country</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
