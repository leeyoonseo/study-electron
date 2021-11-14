// 모듈 읽어오기
// * app
// - 애플리케이션 생명주기 조작등 담당
// - Electron 애플리케이션 전체에서 인스턴스가 1개인 싱글톤 객체
// * BrowserWindow
// - Renderer 프로세스를 만들어 웹 페이지를 출력하게 해줌
// - BrwoserWindow 인스턴스 1개는 웹 페이지 1개를 의미
const { app, BrowserWindow } = require("electron");


let win;


const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });


  // * 해당 위치의 HTML을 읽어들인다.
  win.loadURL(`file://${__dirname}/index.html`);


  // * 윈도우가 닫힐 때 참조 제거
  win.on('closed', () => {
    win = null;
  });
};


// * app 인스턴스의 생명주기
// ready: 애플리케이션 실행되고 초기화가 완료되었을 때
app.on('ready', createWindow);


// * app 인스턴스의 생명주기
// * window-all-closed: 모든 윈도우가 닫혔을 때
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// * app 인스턴스의 생명주기
// * activate:
// - 애플리케이션이 비활성화 상태에서 활성화되었을 때
// - macOS에서만 지원하는 생명주기, Dock에서 아이콘을 클릭할 때 발생
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});