import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Related from "./Related";

const SongDetails = ({ current, setIndex, playing, setPlay, setSong }) => {
  const { song_id } = useParams();
  const [songObj, setSongObj] = useState();
  const [loading, setLoading] = useState(false);
  const [tracksRelated, setTrackRelated] = useState(null);

  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${song_id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSongObj(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [song_id]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${song_id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTrackRelated(response);
      })
      .catch((err) => console.error(err));
  }, [song_id]);

  const newRelated =
    tracksRelated && tracksRelated.filter((track) => track.images);
  console.log(tracksRelated);

  const formatText = (text) => {
    const area = document.createElement("textarea");
    area.value = text;
    return area.value;
  };

  return (
    <div className="songDetails">
      <div className="text-center">{loading && <Loader />}</div>
      {songObj && (
        <div className="mt-4">
          <div className="d-flex gap-3 align-items-center">
            <img
              src={songObj.images.coverart}
              alt=""
              className="cover_pic rounded-circle"
            />
            <div>
              <div className="gen fw-bold">{songObj.title}</div>
              <div className="gen fw-light smalls">
                {formatText(songObj.artists[0]?.alias)}
              </div>
              <div className="gen fw-light smalls">
                {songObj.genres?.primary}
              </div>
            </div>
          </div>

          <div className="fw-bold mt-3">Lyrics:</div>
          <div className="lyrics_part">
            {songObj.sections[1].type === "LYRICS" ? (
              songObj.sections[1].text.map((line, i) => (
                <div key={i} className="lyric_line">
                  {line}
                </div>
              ))
            ) : (
              <div>Lyrics not found</div>
            )}
          </div>
        </div>
      )}
      <div className="fw-bold mt-3">Related:</div>
      <div className="related">
        {newRelated &&
          newRelated.map((track, idx) => (
            <Related
              key={idx}
              track={track}
              current={current}
              setIndex={setIndex}
              playing={playing}
              setPlay={setPlay}
              setSong={setSong}
              index={idx}
              tracks={newRelated}
            />
          ))}
      </div>
    </div>
  );
};

export default SongDetails;
