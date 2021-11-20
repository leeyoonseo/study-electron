import { dialog } from 'electron';

function showSaveAsNewFileDialog() {
  return new Promise((resolve, reject) => {
    const file = dialog.showSaveDialog({
      title: 'save',
      filters: [
        {
          name: 'markdown file',
          extensions: ['md']
        }
      ]
    });

    if (file) {
      resolve(file);
    } else {
      reject();
    }
  }).catch(error => console.log(error));
}

export default showSaveAsNewFileDialog;