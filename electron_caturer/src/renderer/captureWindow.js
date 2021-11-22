import { ipcRenderer, desktopCapturer, screen } from 'electron';

function getDesktopVideoStream(sourceDisplay) {
  return new Promise((resolve, reject) => {
    desktopCapturer.getSources({
      types: ['screen']
    }, (error, sources) => {
      if (error) {
        return reject(error);
      }

      let targetSource;
      if (sources.length === 1) {
        targetSource = sources[0];
      } else {
        targetSource = sources.find(source => source.name === sourceDisplay.name);
      }

      if (!targetSource) {
        return reject({ message: 'No available source' });
      }

      // 스트림 객체 얻기 
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: targetSource.id,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 4096,
            maxHeight: 4096,
          }
        }
      }, resolve, reject);
    });
  });



}

function getCaptureImage({ videoElement, trimmedBounds, sourceDisplay }) {
  // 비디오 요소 너비, 높이 추출
  const { videoWidth, videoHeight } = videoElement;
  // 캡쳐 대상 출력 배율 추출
  const s = sourceDisplay.scaleFactor || 1;

  // 비디오 요소 내부 데스크톱 이미지 여백 크기 산출
  const blankWidth = Math.max((videoWidth - sourceDisplay.bounds.width * s) / 2, 0);
  const blankHeight = Math.max((videoHeight - sourceDisplay.bounds.height * s) / 2, 0);

  // 비디오 요소 내부의 대상 영역의 위치(x, y 좌표) 산출
  const offsetX = (trimmedBounds.x - sourceDisplay.bounds.x) * s + blankWidth;
  const offsetY = (trimmedBounds.y - sourceDisplay.bounds.y) * s + blankHeight;

  // canvas 요소 만들기
  const canvasElement = document.createElement('canvas');
  const context = canvasElement.getContext('2d');

  // 자를 대상 영역의 너비와 높이를 canvas 요소에 설정
  canvasElement.width = trimmedBounds.width;
  canvasElement.height = trimmedBounds.height;

  // canvas 요소에 video 요소 내용 렌더링
  context.drawImage(
    videoElement,
    offsetX,
    offsetY,
    trimmedBounds.width * s,
    trimmedBounds.height * s,
    0,
    0,
    trimmedBounds.width,
    trimmedBounds.height
  );

  // canvas 요소에서 이미지 데이터 추출
  return canvasElement.toDataURL('image/png');
}

const sourceDisplay = screen.getPrimaryDisplay();
sourceDisplay.name = 'Screen 1';
const trimmedBounds = { x: 100, y: 100, width: 300, height: 300 };

ipcRenderer.on('CAPTURE', (_, { sourceDisplay, trimmedBounds }) => {
  getDesktopVideoStream(screen.getPrimaryDisplay()).then(stream => {
    // 추출한 스트림을 객체 URL로 변환
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(stream);
    videoElement.play();
    videoElement.addEventListener('loadedmetadata', () => {
      // 비디오 요소에서 이미지 데이터 추출
      const dataURL = getCaptureImage({ videoElement, trimmedBounds, sourceDisplay });

      // Main 프로세스로 이미지 데이터 추출
      ipcRenderer.send('REPLY_CAPTURE', { dataURL });
      videoElement.pause();
      
      // 객체 url 파기
      URL.revokeObjectURL(dataURL);
    });
  })
  .catch(error => {
    ipcRenderer.send('REPLY_CAPTURE', { error });
  });
});

