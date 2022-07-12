import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const localStorageKey = 'videoplayer-current-time';
const lastPlaybackTime = JSON.parse(localStorage.getItem(localStorageKey));
let gCurrentTime = { seconds: 0 };
const throttling = throttle(() => {
  localStorage.setItem(localStorageKey, Math.round(gCurrentTime.seconds));
}, 1000);

getlastPlaybackTime(lastPlaybackTime);
savePlayTimeLS();

function savePlayTimeLS() {
  player.on('timeupdate', function (currentTime) {
    gCurrentTime = currentTime;
    throttling();
  });
}

function getlastPlaybackTime(time) {
  if (time) {
    console.log('Вы остановились на', time, 'сек.');
    player.setCurrentTime(time);
  } else {
    console.log('Вы еще не смотрели это видео');
  }
}
