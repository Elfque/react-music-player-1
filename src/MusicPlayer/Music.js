import { useState, useRef } from "react";
import Audio from "./components/Audio";
import Dashboard from "./components/Dashboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
// import Artist from "./components/Artist";
import SongDetails from "./components/SongDetails";
import TopSongs from "./components/TopSong";
import WorldTop from "./components/WorldTop";
import { useEffect } from "react";

const Music = () => {
  const [playing, setPlaying] = useState(false);
  const [songArray, setSongArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("00 : 00");
  const [durationTime, setDurationTime] = useState("00 : 00");
  const [audioVolume, setAudioVolume] = useState(1);
  const [current, setCurrent] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  let currentSong = songArray[index];
  const rangeRef = useRef();
  const volumeRef = useRef();

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

  const playPause = () => {
    setPlaying(!playing);
    console.log(currentSong.hub.actions[1].uri);
  };

  const volumeChange = () => {
    return volumeRef.current.value / 100;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (currentSong) {
          playPause();
        }
      }
    });
  });

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
          <Route
            path="/song/:song_id"
            element={
              <SongDetails
                current={currentSong}
                setIndex={setIndex}
                playing={playing}
                setPlay={setPlaying}
                setSong={setSongArray}
              />
            }
          />
          <Route
            path="/top"
            element={
              <TopSongs
                songArray={songArray}
                playing={playing}
                setIndex={setIndex}
                setPlay={setPlaying}
                currentSong={currentSong}
                setSong={setSongArray}
              />
            }
          />
          <Route
            path="/world"
            element={
              <WorldTop
                songArray={songArray}
                playing={playing}
                setIndex={setIndex}
                setPlay={setPlaying}
                currentSong={currentSong}
                setSong={setSongArray}
              />
            }
          />
        </Routes>

        {currentSong && (
          <Player
            playPause={playPause}
            playing={playing}
            currentSong={currentSong}
            rangeRef={rangeRef}
            playNext={playNext}
            playPrevious={playPrevious}
            current={currentTime}
            duration={durationTime}
            setAudioVolume={setAudioVolume}
            setCurrent={setCurrent}
            setRepeat={setRepeat}
            setShuffle={setShuffle}
            repeat={repeat}
            shuffle={shuffle}
          />
        )}
        {currentSong && (
          <Audio
            currentSong={currentSong}
            volumeChange={volumeChange}
            playing={playing}
            setPlay={setPlaying}
            rangeRef={rangeRef}
            playNext={playNext}
            setDurationTime={setDurationTime}
            setCurrentTime={setCurrentTime}
            volumeRef={volumeRef}
            audioVolume={audioVolume}
            current={current}
          />
        )}
      </div>
    </Router>
  );
};

export default Music;
