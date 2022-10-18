import { useState, useRef } from "react";
import Audio from "./components/Audio";
import Dashboard from "./components/Dashboard";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Artist from "./components/Artist";
import SongDetails from "./components/SongDetails";
import TopSongs from "./components/TopSong";
import WorldTop from "./components/WorldTop";
import { FaList } from "react-icons/fa";

const Music = () => {
  const [playing, setPlaying] = useState(false);
  const [songArray, setSongArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("00 : 00");
  const [durationTime, setDurationTime] = useState("00 : 00");
  const [audioVolume, setAudioVolume] = useState(1);
  const [current, setCurrent] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [showSide, setShowSide] = useState(false);

  // let currentSong = "Wake.mp3";
  let currentSong = songArray[index];
  const rangeRef = useRef();
  const audio = useRef();
  const playNext = () => {
    if (shuffle) {
      setIndex(
        (currentIndex) =>
          (currentIndex = Math.trunc(Math.random() * songArray.length + 1))
      );
    } else {
      setIndex((currentIndex) =>
        currentIndex === songArray.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  const playPrevious = () => {
    if (shuffle) {
      setIndex(
        (currentIndex) =>
          (currentIndex = Math.trunc(Math.random() * songArray.length + 1))
      );
    } else {
      setIndex((currentIndex) =>
        currentIndex === 0 ? songArray.length - 1 : currentIndex - 1
      );
    }
  };

  const playPause = () => {
    setPlaying(!playing);
  };

  const decideTime = () => {
    audio.current.currentTime = (current * audio.current.duration) / 100;
  };

  return (
    <Router>
      <div className="music">
        <nav>
          <div className="nav">
            <FaList
              className="nav_icon"
              onClick={() => setShowSide(!showSide)}
            />
          </div>
        </nav>
        <Sidebar showSide={showSide} setShowSide={setShowSide} />
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
          <Route
            path="/artist/:artist_id"
            element={
              <Artist
                currentSong={currentSong}
                playing={playing}
                setIndex={setIndex}
                setPlay={setPlaying}
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
            decideTime={decideTime}
            audioVolume={audioVolume}
          />
        )}
        {currentSong && (
          <Audio
            currentSong={currentSong}
            playing={playing}
            rangeRef={rangeRef}
            playNext={playNext}
            setDurationTime={setDurationTime}
            setCurrentTime={setCurrentTime}
            audioVolume={audioVolume}
            repeat={repeat}
            audio={audio}
          />
        )}
      </div>
    </Router>
  );
};

export default Music;
