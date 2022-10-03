import { useState, useRef } from "react";
import Audio from "./components/Audio";
import Dashboard from "./components/Dashboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Artist from "./components/Artist";
import SongDetails from "./components/SongDetails";

const Music = () => {
  const [playing, setPlaying] = useState(false);
  const [songArray, setSongArray] = useState([]);
  const [index, setIndex] = useState(0);

  let currentSong = songArray[index];
  const rangeRef = useRef();

  const playNext = () => {
    setIndex((currentIndex) =>
      currentIndex === songArray.length - 1 ? 0 : currentIndex + 1
    );
  };

  const playPrevious = () => {
    setIndex((currentIndex) =>
      currentIndex === 0 ? songArray.length - 1 : currentIndex - 1
    );
  };

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "4f2c59e98emsh368e30c514b9cd9p1c8ff5jsnc72d4bf8e55c",
  //       "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  //     },
  //   };
  //   fetch(fetLink, options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setSongArray(response);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  // songArray && console.log(songArray);

  const playPause = () => {
    setPlaying(!playing);
    console.log(currentSong.hub.actions[1].uri);
  };

  return (
    <Router>
      <div className="music">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                songArray={songArray}
                playing={playing}
                setIndex={setIndex}
                setPlay={setPlaying}
                currentSong={currentSong}
                setSong={setSongArray}
              />
            }
          />
          <Route path="/song/:song_id" element={<SongDetails />} />
        </Routes>

        {currentSong && (
          <Player
            playPause={playPause}
            playing={playing}
            currentSong={currentSong}
            rangeRef={rangeRef}
            playNext={playNext}
            playPrevious={playPrevious}
          />
        )}
        {currentSong && (
          <Audio
            currentSong={currentSong}
            playing={playing}
            setPlay={setPlaying}
            rangeRef={rangeRef}
          />
        )}
      </div>
    </Router>
  );
};

export default Music;
