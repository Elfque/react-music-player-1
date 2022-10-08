// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const Artist = () => {
//   const artist_id = useParams();

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
//         "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//       },
//     };
//     fetch(
//       `https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${artist_id.artist_id}`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <div>This is the Artist page</div>
//     </div>
//   );
// };

// export default Artist;
