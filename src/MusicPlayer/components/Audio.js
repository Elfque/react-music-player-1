import { useEffect } from "react";

const Audio = ({
  currentSong,
  playing,
  rangeRef,
  playNext,
  setDurationTime,
  setCurrentTime,
  audioVolume,
  repeat,
  audio,
}) => {
  const timeUpdate = () => {
    rangeRef.current.value =
      (audio.current.currentTime / audio.current.duration) * 100;

    let durationMin = Math.floor(audio.current.duration / 60);
    let durationSec = Math.floor(audio.current.duration % 60);
    let currentMin = Math.floor(audio.current.currentTime / 60);
    let currentSec = Math.floor(audio.current.currentTime % 60);

    if (durationMin < 10) durationMin = `0${durationMin}`;
    if (durationSec < 10) durationSec = `0${durationSec}`;
    if (currentMin < 10) currentMin = `0${currentMin}`;
    if (currentSec < 10) currentSec = `0${currentSec}`;
    setCurrentTime(`${currentMin} : ${currentSec}`);
    if (audio.current.currentTime < 1) {
      setDurationTime(`00 : 00`);
    }
    setDurationTime(`${durationMin} : ${durationSec}`);
  };

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [playing, currentSong, audio]);

  useEffect(() => {
    audio.current.volume = audioVolume;
  }, [audioVolume, audio]);

  const decidePlay = () => {
    if (repeat) {
      audio.current.play();
    } else {
      playNext();
    }
  };

  return (
    <audio
      src={currentSong?.hub?.actions[1].uri}
      ref={audio}
      onTimeUpdate={timeUpdate}
      onEnded={decidePlay}
    ></audio>
    // <audio src="./Wake.mp3" ref={audio} onTimeUpdate={timeUpdate}></audio>
  );
};

export default Audio;
