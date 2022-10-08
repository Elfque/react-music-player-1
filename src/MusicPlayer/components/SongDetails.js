import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Related from "./Related";

const SongDetails = ({ current, setIndex, playing, setPlay, setSong }) => {
  const song_id = useParams();
  const [songObj, setSongObj] = useState();
  const [songFetchLink, setSongFetchLink] = useState(
    `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${song_id.song_id}`
  );
  const [trackRelatedLink, setTrackRelatedLink] = useState(
    `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${song_id.song_id}`
  );
  const [loading, setLoading] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
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
    fetch(songFetchLink, options)
      .then((response) => response.json())
      .then((response) => {
        setSongObj(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [songFetchLink]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    fetch(trackRelatedLink, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTrackRelated(response);
      })
      .catch((err) => console.error(err));
  }, [trackRelatedLink]);

  const setNewFetch = (songId) => {
    setSongFetchLink(
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${songId}`
    );
    setTrackRelatedLink(
      `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${songId}`
    );
  };

  const newRelated =
    tracksRelated && tracksRelated.filter((track) => track.images);

  return (
    <div className="songDetails">
      <h1>Song Details</h1>
      <div className="text-center">{loading && <Loader />}</div>
      <div
        className="blur"
        style={{
          background: songObj && `url(${songObj.images.background}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      {songObj && (
        <div>
          <img src={songObj.images.coverart} alt="" className="cover_pic" />

          <div className="gen">Title : {songObj.title}</div>
          <div className="gen">Artist : {songObj.artists[0]?.alias}</div>
          <div className="gen">Genre : {songObj.genres?.primary}</div>
          <button
            className="open_lyrics"
            onClick={() => setShowLyrics(!showLyrics)}
          >
            {showLyrics ? "Close Lyrics" : "Open Lyrics"}
          </button>
          {showLyrics && (
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
              <button
                className="open_lyrics"
                onClick={() => setShowLyrics(false)}
              >
                Close Lyrics
              </button>
            </div>
          )}
        </div>
      )}
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
              setNewFetch={setNewFetch}
            />
          ))}
      </div>
    </div>
  );
};

export default SongDetails;
