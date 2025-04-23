if (!localStorage.getItem('likedSongs')) {
    localStorage.setItem('likedSongs', JSON.stringify([]));
}

// code by chatGPT to detect sites
function initApp() {
    const path = window.location.pathname;

    if (path.includes('likedSongs.html')) {
        console.log('On Liked Songs Page');
        displayLikedSongs(songData, songData.length, "likedSongsOutput");
    } 
    else if (path.includes('index.html')) {
        console.log('On main page');
        displaySongData(songData, 3, "newReleaseBoxes");
        printPopularArtists();
    }
}

initApp();

printPopularArtists();

function printPopularArtists() {
    displayArtistData(artistData, 3);
}


// Display songs with a count (how many to display)
function displaySongData(data, count, idName) {
    const songsBox = document.getElementById(idName);
    console.log("ID name: " + idName);
    console.log("Count: " + count);
    songsBox.innerHTML = '';

    console.log(`Displaying ${count} result(s).`);

    let countTMP = 0;

    for (let i = 0; i < count && i < data.length; i++) {
        const song = data[i];
        const songElement = document.createElement('div');
        songElement.classList.add(`song${countTMP}`, 'songBox');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.id} cover" class="songCoverImage" onclick="playSong(${song.id})">
            <img src="img/like.png" alt="likeButton" class="likeButton" onclick="likeSong(${song.id})">
            <h3 class="titleSong" id="titleSong${song.id}">${song.title}</h3>
            <p class="artistSong" id="artistSong${song.id}">Artist: ${song.artist}</p>
        `;
        songsBox.appendChild(songElement);

        countTMP++;
    }

    countTMP = 0;
}

// Display songs with a count (how many to display)
function displayLikedSongs(data, count, idName) {
    const songsBox = document.getElementById(idName);
    console.log("AAAAAAAAAAAAHHHHHHHHHHHH")
    songsBox.innerHTML = '';

    console.log(`Displaying ${count} result(s).`);

    let countTMP = 0;

    for (let i = 0; i < count && i < data.length; i++) {
        const song = data[i];
        const songElement = document.createElement('div');
        songElement.classList.add(`likedSong${countTMP}`, 'songBoxLiked');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.id} cover" class="songCoverImage" onclick="playSong(${song.id})">
            <img src="img/like.png" alt="likeButton" class="likeButton" onclick="likeSong(${song.id})">
            <h3 class="titleSong" id="titleSong${song.id}">${song.title}</h3>
            <p class="artistSong" id="artistSong${song.id}">Artist: ${song.artist}</p>
        `;
        songsBox.appendChild(songElement);

        countTMP++;
    }

    countTMP = 0;
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

    let storedArray = JSON.parse(localStorage.getItem('likedSongs')) || [];

    if (!storedArray.includes(songID)) {
        storedArray.push(songID);
        localStorage.setItem('likedSongs', JSON.stringify(storedArray));
    } else {
        console.log(`Song ${songID} already liked.`);
    }
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

    displaySongData(searchResults, 3, "newRelease");
    document.getElementById("newRelease").innerHTML = "Search Results";
}

// Playing a song by ChatGPT

let currentAudio = document.getElementById("audioElm");
let isPlaying = false;

async function playSong(id) {
    document.getElementById("footer").style.opacity = 1;

    const song = songData.find(s => s.id === id);
    if (!song) return;

    currentAudio.pause(); // stop any currently playing
    currentAudio.src = song.mp3;
    currentAudio.load();
    currentAudio.play();
    isPlaying = true;

    console.log(`Playing: ${song.title}`);
    document.getElementById("nowPlaying").innerHTML = `Now playing: ${song.title} by ${song.artist}`;
    document.getElementById("pauseButton").style.display = "block";
    updatePlayPauseButtons();

    currentAudio.onended = () => {
        isPlaying = false;
        updatePlayPauseButtons();

        setTimeout(() => {
            document.getElementById("footer").style.opacity = 0;
        }, 3000);
          
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

// Make a gradient for top bar (not finetuned):

/*
var multiple = new Multiple({
    selector: '.topBarItem',
    background: 'linear-gradient(90deg, #B3D6FF, #66EDB3, #C0FF6E)',
    text: true
});
*/

// for wave.js

let audioElement = document.querySelector("#audioElm");
let canvasElement = document.querySelector("#canvasElm");
let wave = new Wave(audioElement, canvasElement);

// Simple example: add an animation
wave.addAnimation(new wave.animations.Wave({
    lineWidth: 8,
    lineColor: {gradient: ["#B3D6FF", "#66EDB3", "#C0FF6E"]},
    count: 50,
    fillColor: {gradient: ["#B3D6FF", "#66EDB3", "#C0FF6E"]}
}));

// Intermediate example: add an animation with options
/*
//wave.addAnimation(new wave.animations.Wave({
    lineWidth: 10,
    lineColor: "red",
    count: 20
}));
*/

// Expert example: add multiple animations with options
/*
wave.addAnimation(new wave.animations.Square({
    count: 50,
    diamater: 300
}));
*/

/*
wave.addAnimation(new wave.animations.Glob({
    fillColor: {gradient: ["red","blue","green"], rotate: 45},
    lineWidth: 10,
    lineColor: "#fff"
}));
*/
