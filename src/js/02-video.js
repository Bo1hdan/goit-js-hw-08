import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

function storage(data) {
  let currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}

player.on('timeupdate', throttle(storage, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  const currentTime = parseFloat(savedTime);
  player
    .setCurrentTime(currentTime)
    .then(() => {
      console.log('Video playback started at:', currentTime);
    })
    .catch(error => {
      console.error('Error setting current time:', error);
    });
}

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
