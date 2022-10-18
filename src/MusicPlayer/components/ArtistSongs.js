const ArtistSong = ({ song }) => {
  return (
    <div className="artistSong align-items-center my-3 p-2">
      <img
        src={song.attributes.artwork.url
          .replace("{w}", "500")
          .replace("{h}", "500")}
        alt=""
      />
      <div className="art_song">
        <div className="fw-bold fs-6 text-truncate">{song.attributes.name}</div>
        <div className="light_text">
          {song.attributes.genreNames.join("  ")}
        </div>
      </div>
    </div>
  );
};

export default ArtistSong;
