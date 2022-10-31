import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtistSong from "./ArtistSongs";

const Artist = () => {
  const [artistInfo, setArtistInfo] = useState(null);
  const { artist_id } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${artist_id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setArtistInfo(response))
      .catch((err) => console.error(err));
  }, []);

  const albumsArray = artistInfo && Object.values(artistInfo.albums);

  return (
    <div className="p-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src={artistInfo?.artists[artist_id].attributes.artwork.url
            .replace("{w}", "500")
            .replace("{h}", "500")}
          alt=""
          className="artist_image rounded-circle"
        />
        <div>
          <div className="fw-bold fs-4">
            {artistInfo?.artists[artist_id].attributes.name}
          </div>
          <div className="light_text">
            {artistInfo?.artists[artist_id].attributes.genreNames.join(" & ")}
          </div>
        </div>
      </div>
      <div className="fw-bold fs-5">Albums:</div>
      {artistInfo &&
        albumsArray.map((alb, index) => <ArtistSong song={alb} key={alb.id} />)}
    </div>
  );
};

export default Artist;
