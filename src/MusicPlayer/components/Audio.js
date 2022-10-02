import { useRef, useEffect } from "react";

const Audio = ({ currentSong, playing }) => {
  const audio = useRef();

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      currentSong.hub && audio.current.pause();
    }
  }, [playing, currentSong]);

  return <audio src={currentSong?.hub?.actions[1].uri} ref={audio}></audio>;
};

export default Audio;
