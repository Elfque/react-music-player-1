import { useState } from "react";

const ShazamCore = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "174138913emshc7a7d610491d2fep1fe48ejsn51e5f94cfd9a",
      "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
    },
  };

  fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return { worldChart };
};

export default ShazamCore;
