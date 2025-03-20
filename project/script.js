const songData = [
{
            "id": 0,
            "title": "Lighthouse (feat. PhiloSofie)",
            "cover": "data/songImages/lighthouse_JJD.jpg",
            "artist": "JJD feat. PhiloSofie",
            "releaseDate": "13-03-2025",
            "recent": true
        },
	    {
            "id": 1,
            "title": "Live Your Live",
            "cover": "data/songImages/liveYourLive_Tobu.jpg",
            "artist": "Tobu",
            "releaseDate": "11-03-2025",
            "recent": true
	    },
        {
            "id": 2,
            "title": "Love Letter",
            "cover": "data/songImages/liveYourLive_Tobu.jpg",
            "artist": "m3gatron",
            "releaseDate": "11-03-2025",
            "recent": true
	    },
        {
            "id": 3,
            "title": "Live Your Live",
            "cover": "data/songImages/liveYourLive_Tobu.jpg",
            "artist": "Tobu",
            "releaseDate": "11-03-2025",
            "recent": false
	    }
]

displaySongData(songData, 3);

function displaySongData(data, count) {
    const songsBox = document.getElementById('newReleaseBoxes');
    songsBox.innerHTML = '';

    console.log(count);

    for (let i = 0; i < count && i < data.length; i++) {
        const song = data[i];
        const songElement = document.createElement('div');
        songElement.classList.add(`song${song.id}`);
        songElement.classList.add(`songBox`);
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title} cover" class="songCoverImage" ">
            <h3 class="titleSong" id="titleSong${song.id}">${song.title}</h3>
            <p class="artistSong" id="artistSong${song.id}">Artist: ${song.artist}</p>
        `;
        songsBox.appendChild(songElement);
    }
}

