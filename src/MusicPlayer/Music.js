import { useEffect, useState, useRef } from "react";
import Audio from "./components/Audio";
import Dashboard from "./components/Dashboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import "./style.css";

const Music = () => {
  const [playing, setPlaying] = useState(false);
  const [songArray, setSongArray] = useState([]);
  const [fetLink, setFetLink] = useState(
    "https://shazam-core.p.rapidapi.com/v1/charts/world"
  );
  const [currentSong, setCurrentSong] = useState({});
  const audio = useRef();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4f2c59e98emsh368e30c514b9cd9p1c8ff5jsnc72d4bf8e55c",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(fetLink, options)
      .then((response) => response.json())
      .then((response) => {
        setSongArray(response);
      })
      .catch((err) => console.error(err));
  }, []);
  songArray && console.log(songArray);

  const playPause = () => {
    setPlaying(!playing);
    console.log(currentSong.hub.actions[1].uri);
  };

  return (
    <div className="music">
      <Sidebar />
      <Dashboard
        songArray={songArray}
        setCurrent={setCurrentSong}
        playing={playing}
      />
      <Player
        playPause={playPause}
        playing={playing}
        currentSong={currentSong}
      />
      <Audio currentSong={currentSong} playing={playing} />
    </div>
  );
};

export default Music;
