const { dialog } = require('electron');
// E2E 테스트 특성 상 Mock 테스트하면 안되지만 예제임

require('electron').ipcMain.once('SAVE_AS_NEW_FILE_TEST', (_e) => {
  const saveAsMenu = require('electron')
    .Menu.getApplicationMenu()
    .items.find(item => item.label === 'File')
    .submenu.items.find(item => item.label === 'Save As...');
  
  saveAsMenu.click();
});

function mockShowSaveDialog() {
  return 'sandbox/test.md';
}

dialog.showSaveDialog = mockShowSaveDialog;