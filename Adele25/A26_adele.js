// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://api.lyrics.ovh/v1/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE ////////////////////////
function listTracks() {
  //iterating
  for (item of album.tracks) {
    songList.innerHTML += ` 
    <li class="nav-item">
      <a class="nav-link" href="#" data-toggle="pill">${item}</a>
    </li>
`
  }
}

songList.addEventListener('click', function () {
  const songName = event.target.innerHTML
  axios.get(BASE_URL + album.artist + '/' + songName)
    .then(response => {
      lyricsPanel.innerHTML = `
      <h3>${songName}</h3>
      <pre>${response.data.lyrics}</pre>
    `
    })
    .catch(error => console.log(error))
})

listTracks()
