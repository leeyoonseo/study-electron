import { app, Menu } from 'electron';
import createWindow from './createWindow';

function setAppMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { 
          label: 'NewWindow',
          accelerator: 'CmdOrCtrl+N',
          click: createWindow
        },
        {
          type: 'separator'
        },
        {
          label: 'Close', 
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
        },
        {
          label: 'Toggle DevTools',
          accelerator: process.platform === 'darwin' ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: (item, focusedWindow) => focusedWindow && focusedWindow.toggleDevTools()
        }
      ]
    }
  ];

  // macOS의 경우
  if (process.platform === 'darwin') {
    // 템플릿 앞에 메인 메뉴 추가하기
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services', 
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        },
      ]
    });

    // 템플릿 뒤에 윈도 메뉴 추가하기
    template.push({
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'zoom'
        }
      ]
    });
  }

  // 템플릿으로 Menu 객체 생성하기
  const appMenu = Menu.buildFromTemplate(template);

  // 생성한 Menu 객체를 애플리케이션에 설정하기
  Menu.setApplicationMenu(appMenu);
}

export default setAppMenu;