const musicContainer = document.getElementById("music-container");
const progressContainer = document.getElementById("progress-container");
const playlistContainer = document.getElementById("playlist-container");
const volumeContainer = document.getElementById("volume-container");

const progress = document.getElementById("progress");
const playlist = document.getElementById("playlist");
const volumeRange = document.getElementById("volume-range");
const volume = document.getElementById("volume");

const currTime = document.getElementById("current-time");
const totTime = document.getElementById("total-time");

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playlistBtn = document.getElementById("playlist-btn");
const volumeBtn = document.getElementById("volume-btn");

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//* Song Titles
const songs = ["anewbeginning", "littleidea", "happyrock"];

//* Keep track of songs
let songIdx = 0;

//* Initially load song & playlist in DOM
loadSong(songs[songIdx]);
loadPlaylist();
loadVolume();

//* Update song details
function loadSong(song) {
   title.innerText = song;
   audio.src = `music/${song}.mp3`;
   cover.src = `images/${song}.jpg`;
}

//* Load Playlist
function loadPlaylist() {
   for (let i = 0; i < songs.length; i++) {
      let playlistItem = document.createElement("li");
      playlistItem.classList.add("playlist-item");
      playlistItem.innerHTML = songs[i];
      playlistItem.setAttribute("style", "background-image:url(images/" + songs[i] + ".jpg)");
      playlist.appendChild(playlistItem);
   }
}

//* Set Initial Volume
function loadVolume() {
   audio.volume = 0.9;
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

function playClickedItem(e) {
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

//* Show/Hide Volume Bar when clicked
function showVolume() {
   if (volumeContainer.classList.contains("open")) {
      volumeContainer.classList.remove("open");
      volumeBtn.classList.remove("active");
   } else {
      volumeContainer.classList.add("open");
      volumeBtn.classList.add("active");
   }
}

//* Change Volume
function setVolume(e) {
   let height = this.clientHeight - 1;
   let clickY = e.offsetY;
   let vol = 1 - clickY / height;
   if (vol > 0.5) {
      volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
   }
   if (vol < 0.5 && vol > 0.01) {
      volumeBtn.querySelector("i.fas").classList.remove("fa-volume-up");
      volumeBtn.querySelector("i.fas").classList.remove("fa-volume-off");
      volumeBtn.querySelector("i.fas").classList.add("fa-volume-down");
   } else if (vol < 0.1) {
      volumeBtn.querySelector("i.fas").classList.remove("fa-volume-up");
      volumeBtn.querySelector("i.fas").classList.add("fa-volume-off");
   }
   if (vol < 0.0) {
      vol = 0;
   }
   if (vol > 1.0) {
      vol = 1.0;
   }
   audio.volume = vol;
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
var playlistItems = document.getElementsByClassName("playlist-item");
console.log(playlistItems);
for (let i = 0; i < playlistItems.length; i++) {
   playlistItems[i].addEventListener("click", playClickedItem.bind(this));
}

//* Volume Control Events
volumeBtn.addEventListener("click", showVolume);
volumeRange.addEventListener("click", setVolume);

audio.onvolumechange = (e) => {
   let currVol = e.srcElement.volume;
   let volPercent = currVol * 100;
   volume.style.height = `${volPercent}%`;
};
