import { useRef, useEffect } from "react";

const Audio = ({ currentSong, playing, setPlay, rangeRef }) => {
  const audio = useRef();

  const timeUpdate = () => {
    rangeRef.current.value =
      (audio.current.currentTime / audio.current.duration) * 100;
  };

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      currentSong.hub && audio.current.pause();
    }
  }, [playing, currentSong]);

  return (
    <audio
      src={currentSong?.hub?.actions[1].uri}
      ref={audio}
      onTimeUpdate={timeUpdate}
      onEnded={() => setPlay(false)}
    ></audio>
  );
};

export default Audio;
