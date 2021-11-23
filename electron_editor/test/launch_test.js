// 1. app 실행
// 2. 출력 윈도우 수 세기
// 3. 한개이면 테스트 성공

const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');
const app = new Application({
  path: electron,
  args: [path.join(__dirname, '..')]
});

app.start()
  .then(() => app.client.getWindowCount())
  .then(count => {
    if (count === 1) {
      console.log('success test');
    } else {
      console.log('fail test');
    }
    app.stop();
  });