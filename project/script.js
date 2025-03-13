fetch('/data/songData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    })
  .then(songData => {
    console.log('Song Data:', songData);
  })
  .catch(error => {
    console.error('Error fetching song data:', error);
  });
