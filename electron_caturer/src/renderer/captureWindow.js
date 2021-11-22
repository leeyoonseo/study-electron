import { desktopCapturer } from 'electron';

desktopCapturer.getSources({
  types: ['screen']
}, (error, sources) => {
  sources.forEach(targetSource => {
    console.log(targetSource);
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = targetSource.thumbnail.toDataURL();
    document.querySelector('body').appendChild(thumbnailImg);
  });
});