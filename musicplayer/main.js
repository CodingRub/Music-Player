const musicContainer = document.querySelector('.music-container');
const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const audio = new Audio();
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

var songs = '{"musics":[' +'{"title":"It ain\'t over","slug":"itaintover","Artiste":"Vendredi","Album":"Libre de droits"},' + '{"title":"Come And Get Your Love","slug":"comeandgetyourlove","Artiste":"Redbone","Album":"Come And Get Your Love"},' + '{"title":"Here For You","slug":"hereforyou","Artiste":"Vendredi","Album":"Libre de droits"}'+']}';
const data = JSON.parse(songs)
console.log(data.musics.length);
let songIndex = 1;
loadSong(data.musics[songIndex])

function loadSong(song) {
    title.innerText = song.title;
    audio.src = `musics/${song.slug}.mp3`;
    audio.volume = 0.1;
    cover.src = `images/${song.slug}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play')
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play')
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Previous song
function prevSong() {
    songIndex--;
  
    if (songIndex < 0) {
      songIndex = data.musics.length - 1;
    }
  
    loadSong(data.musics[songIndex]);
  
    playSong();
  }
  
  // Next song
  function nextSong() {
    songIndex++;
  
    if (songIndex > data.musics.length - 1) {
      songIndex = 0;
    }
  
    loadSong(data.musics[songIndex]);
  
    playSong();
  }

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

