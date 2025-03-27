printRecentReleases();

function printRecentReleases() {
    displaySongData(songData, 3);
}

printPopularArtists();

function printPopularArtists() {
    displayArtistData(artistData, 3);
}

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

function displayArtistData(data, count) {
    const songsBox = document.getElementById('popularArtistsBoxes');
    songsBox.innerHTML = '';

    console.log(count);

    for (let i = 0; i < count && i < data.length; i++) {
        const artist = data[i];
        const artistElement = document.createElement('div');
        artistElement.classList.add(`artist${artist.id}`);
        artistElement.classList.add(`artistBox`);
        artistElement.innerHTML = `
            <img src="${artist.cover}" alt="${artist.name} cover" class="artistCoverImage" ">
            <h3 class="artistName" id="artistName${artist.id}">${artist.name}</h3>
        `;
        songsBox.appendChild(artistElement);
    }
}





function printLikedSongs(data) {
    const songsBox = document.getElementById('likedSongsOutput');
    
    for (let i = 0; i < data.length; i++) {
        const song = data[i];
        if (song.liked) {
            const songElement = document.createElement('div');
            songElement.classList.add(`likedSong${song.id}`);
            songElement.classList.add(`songBox`);
            songElement.innerHTML = `
                <img src="${song.cover}" alt="${song.title} cover" class="songCoverImage" ">
                <h3 class="titleSong" id="titleSong${song.id}">${song.title}</h3>
                <p class="artistSong" id="artistSong${song.id}">Artist: ${song.artist}</p>
            `;
            songsBox.appendChild(songElement);
        }
    }
}