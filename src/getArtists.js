function getArtists() {
  return new Promise(resolve => {
    fetch("https://cruuunchify-share.web.app/explore")
      .then(res => res.json())
      .then(resolve);
  });
}

export default getArtists;
