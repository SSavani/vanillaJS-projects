const musicContainer = document.getElementById("music-container");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currTime = document.getElementById("current-time");
const totTime = document.getElementById("total-time");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playlistBtn = document.getElementById("list");

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playlistContainer = document.getElementById("playlist-container");
const playlist = document.getElementById("playlist");

//* Song Titles
const songs = ["anewbeginning", "littleidea", "happyrock"];

//* Keep track of songs
let songIdx = 0;

//* Initially load song & playlist in DOM
loadSong(songs[songIdx]);
loadPlaylist();

//* Update song details
function loadSong(song) {
   title.innerText = song;
   audio.src = `music/${song}.mp3`;
   cover.src = `images/${song}.jpg`;
}

//* Load Playlist
function loadPlaylist() {
   for (let i = 0; i < songs.length; i++) {
      listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = songs[i];
      listItem.setAttribute("style", "background-image:url(images/" + songs[i] + ".jpg)");
      playlist.appendChild(listItem);
   }
}

function playSong() {
   musicContainer.classList.add("play");
   playBtn.querySelector("i.fas").classList.remove("fa-play");
   playBtn.querySelector("i.fas").classList.add("fa-pause");

   audio.play();
}

function pauseSong() {
   musicContainer.classList.remove("play");
   playBtn.querySelector("i.fas").classList.add("fa-play");
   playBtn.querySelector("i.fas").classList.remove("fa-pause");

   audio.pause();
}

function nextSong() {
   songIdx++;
   if (songIdx === songs.length) {
      songIdx = 0;
   }
   loadSong(songs[songIdx]);
   playSong();
}

function prevSong() {
   songIdx--;
   if (songIdx < 0) {
      songIdx = songs.length - 1;
   }
   loadSong(songs[songIdx]);
   playSong();
}

function updateProgress(e) {
   const { duration, currentTime } = e.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
   currTime.innerText = formatTime(Math.floor(currentTime));
   if (isNaN(duration)) {
      totTime.innerText = "0:00";
   } else {
      totTime.innerText = formatTime(Math.floor(duration));
   }
}

function formatTime(seconds) {
   let min = Math.floor(seconds / 60);
   let sec = Math.floor(seconds - 60 * min);
   if (sec < 10) {
      sec = `0${sec}`;
   }
   return `${min}:${sec}`;
}

function setProgress(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
}

//* Show/Hide playlist when clicked
function showPlaylist() {
   if (playlistContainer.classList.contains("open")) {
      playlistContainer.classList.remove("open");
      playlistBtn.querySelector("i").classList.remove("fas");
      playlistBtn.querySelector("i").classList.add("far");
      // unloadPlaylist();
   } else {
      // loadPlaylist();
      playlistContainer.classList.add("open");
      playlistBtn.querySelector("i").classList.remove("far");
      playlistBtn.querySelector("i").classList.add("fas");
   }
}

//* Play/Pause Song Events
playBtn.addEventListener("click", () => {
   const isPlaying = musicContainer.classList.contains("play");

   if (isPlaying) {
      pauseSong();
   } else {
      playSong();
   }
});

//* Change Song Events
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

//* Update Progress Bar
audio.addEventListener("timeupdate", updateProgress);

//* Click on progress bar to jump to that part of song
progressContainer.addEventListener("click", setProgress);

//* To play next song when current song completes
audio.addEventListener("ended", nextSong);

//* Toggle Playlist
playlistBtn.addEventListener("click", showPlaylist);

//* PlayList Items' Click Events
var playlistItems = document.getElementsByClassName("list-item");
console.log(playlistItems);
for (let i = 0; i < playlistItems.length; i++) {
   playlistItems[i].addEventListener("click", getClickedItem.bind(this));
}

function getClickedItem(e) {
   console.log("Start");
   for (let i = 0; i < playlistItems.length; i++) {
      if (e.target === playlistItems[i]) {
         var idx = e.target.innerText.toLowerCase();
         if (idx == songs[songIdx]) {
            const isPlaying = musicContainer.classList.contains("play");
            if (isPlaying) {
               pauseSong();
            } else {
               playSong();
            }
         } else {
            songIdx = songs.indexOf(idx);
            loadSong(idx);
            playSong();
         }
      }
   }
}
