import { useEffect, useState, useRef } from "react";
import { genres } from "../constants";
import Song from "./Song";

const Dashboard = ({ songArray, setIndex, playing, setPlay, currentSong }) => {
  const genreRef = useRef();

  let genreTitle = "Film";
  return (
    <div className="dashboard">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center  mt-3 mb-5 px-4">
          <h1>Discover {genreTitle}</h1>
          <select name="" id="" ref={genreRef}>
            {genres.map((gen) => (
              <option value={gen.value} key={gen.title}>
                {gen.title}
              </option>
            ))}
          </select>
        </div>
        <div className="songs mt-3">
          {songArray &&
            songArray.map((song, index) => (
              <Song
                key={song.key}
                index={index}
                song={song}
                setIndex={setIndex}
                songs={songArray}
                playing={playing}
                currentSong={currentSong}
                setPlay={setPlay}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
