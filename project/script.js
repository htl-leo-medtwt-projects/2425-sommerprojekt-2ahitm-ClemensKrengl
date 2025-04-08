AOS.init();

printRecentReleases();

function printRecentReleases() {
    displaySongData(songData, 3);
}

printPopularArtists();

function printPopularArtists() {
    displayArtistData(artistData, 3);
}


// Display songs with a count (how many to display)
function displaySongData(data, count) {
    const songsBox = document.getElementById('newReleaseBoxes');
    songsBox.innerHTML = '';

    console.log(`Displaying ${count} result(s).`);

    for (let i = 0; i < count && i < data.length; i++) {
        const song = data[i];
        const songElement = document.createElement('div');
        songElement.classList.add(`song${song.id}`, 'songBox');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title} cover" class="songCoverImage" onclick="playSong(${song.id})">
            <img src="img/like.png" alt="likeButton" class="likeButton" onclick="likeSong(${song.id})">
            <h3 class="titleSong" id="titleSong${song.id}">${song.title}</h3>
            <p class="artistSong" id="artistSong${song.id}">Artist: ${song.artist}</p>
        `;
        songsBox.appendChild(songElement);
    }
}

// Display artists with a count (how many to display)
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
            <p class="artistReleases" id="artistReleases${artist.id}">${artist.releases} Releases</p>
        `;
        songsBox.appendChild(artistElement);
    }
}

// Print liked songs:
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

function likeSong(songID) {
    console.log(songID);
}

// Search for a song:

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSong(searchInput.value);
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        togglePlayPause();
    }
});

function searchSong(song) {
    console.log("Searching for:", song);

    const searchResults = [];

    for (let i = 0; i < songData.length; i++) {
        if (songData[i].title.toLowerCase().includes(song.toLowerCase())) {
            console.log("Found Song.");
            searchResults.push(songData[i]);
        }
    }

    displaySongData(searchResults, 3);
    document.getElementById("newRelease").innerHTML = "Search Results";
}

// Playing a song by ChatGPT

let currentAudio = null;
let isPlaying = false;

function playSong(id) {

    document.getElementById("footer").style.opacity = 1;

    const song = songData.find(s => s.id === id);
    if (!song) return;

    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
    }

    currentAudio = new Audio(song.mp3);
    currentAudio.play();
    isPlaying = true;

    console.log(`Playing: ${song.title}`);
    document.getElementById("nowPlaying").innerHTML = `Now playing: ${song.title} by ${song.artist}`;
    document.getElementById("pauseButton").style.display = "block";
    updatePlayPauseButtons();

    currentAudio.onended = () => {
        isPlaying = false;
        updatePlayPauseButtons();
    };
}

// Play/Pause:

function togglePlayPause() {
    if (!currentAudio) return;

    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
    } 
    else {
        currentAudio.play();
        isPlaying = true;
    }

    updatePlayPauseButtons();
}

function updatePlayPauseButtons() {
    document.getElementById('playButton').style.display = isPlaying ? 'none' : 'inline';
    document.getElementById('pauseButton').style.display = isPlaying ? 'inline' : 'none';
}

// Make a gradient around song and artist boxes via multiple.js:

/*
var multiple = new Multiple({
    selector: '.artistBox',
    background: 'linear-gradient(90deg, #B3D6FF, #66EDB3, #C0FF6E)'
});

var multiple = new Multiple({
    selector: '.songBox',
    background: 'linear-gradient(90deg, #B3D6FF, #66EDB3, #C0FF6E)'
});
*/