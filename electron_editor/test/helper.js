const fs = require('fs');
const outputDir = 'reports';

// 캡쳐 추출, 폴더에 출력
function capturePage(app, testName) {
  return app.browserWindow.capturePage().then(img => {
    fs.writeFileSync(`${outputDir}/capture_${testName}.png`, img);
  });
}

function reportLog(app, testName) {
  return Promise.all([
    app.client.getRenderProcessLogs(),
    app.client.getMainProcessLogs()
  ]).then(([rendererLogs, mainLogs]) => {
    const logs = JSON.stringify({
      renderer: rendererLogs,
      main: mainLogs
    });

    fs.writeFileSync(`${outputDir}/logs_${testName}.txt`, logs, 'utf8');
  })
}

module.exports = { capturePage, reportLog };