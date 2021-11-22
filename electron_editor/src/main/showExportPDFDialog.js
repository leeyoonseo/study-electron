import { dialog } from 'electron';

function showExportPDFDialog() {
  return new Promise((resolve, reject) => {
    const files = dialog.showOpenDialog({
      title: 'export as PDF',
      filters: [
        { 
          name: 'pdf file',
          extensions: ['pdf']
        }
      ]
    });

    if (files) {
      resolve(files);
    } else {
      reject();
    }
  }).catch(error => console.log(error));
}

export default showExportPDFDialog;