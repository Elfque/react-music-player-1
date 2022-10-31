import { FaGlobe, FaGlobeAfrica, FaSlidersH } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = ({ showSide, setShowSide }) => {
  return (
    <div className="sidebar">
      <div className={`side ${showSide ? "" : "hide"}`}>
        <div className="music_logo">
          <img src="./logo.png" alt="" />
        </div>
        <div className="Links">
          <div className="link" onClick={() => setShowSide(false)}>
            <FaSlidersH />
            <Link to={"/"}>Discover</Link>
          </div>
          <div className="link" onClick={() => setShowSide(false)}>
            <FaGlobe />
            <Link to={"/top"}>Top Chart</Link>
          </div>
          <div className="link" onClick={() => setShowSide(false)}>
            <FaGlobeAfrica />
            <Link to={"/world"}>Around You</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
