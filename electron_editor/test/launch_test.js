const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');
const assert = require('assert');

const app = new Application({
  path: electron,
  args: [path.join(__dirname, '..')]
});

// this.timeout을 위해 arrow function 사용x
describe('애플리케이션 실행 테스트', function () {
  this.timeout(10000); // 10초 넘으면 테스트 실패

  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    return app.stop();
  });

  it('애플리케이션이 실행된 뒤 윈도 하나를 출력했습니다.', function () {
    return app.client.getWindowCount()
      .then(count => assert.equal(count, 1));
  });
});