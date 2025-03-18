const songData = [
{
            "id": 0,
            "title": "Lighthouse (feat. PhiloSofie)",
            "cover": "/songImage/lighthouse_JJD.jpg",
            "artist": "JJD",
            "releaseDate": 13032025,
            "recent": true
        },
	    {
            "id": 1,
            "title": "Live Your Live",
            "cover": "liveYourLive_Tobu.jpg",
            "artist": "Tobu",
            "releaseDate": 11032025,
            "recent": true
	    },
        {
            "id": 2,
            "title": "Love Letter",
            "cover": "liveYourLive_Tobu.jpg",
            "artist": "m3gatron",
            "releaseDate": 11032025,
            "recent": true
	    },
        {
            "id": 3,
            "title": "Live Your Live",
            "cover": "liveYourLive_Tobu.jpg",
            "artist": "Tobu",
            "releaseDate": 11032025,
            "recent": false
	    }
]

displaySongData(songData);

function displaySongData(data) {
    const newReleaseBoxes = document.getElementById('newReleaseBoxes');
    newReleaseBoxes.innerHTML = '';

    data.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title} cover">
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Release Date: ${new Date(song.releaseDate).toLocaleDateString()}</p>
        `;
        newReleaseBoxes.appendChild(songElement);
    });
}
