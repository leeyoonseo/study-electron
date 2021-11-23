const assert = require('assert');
const createApplication = require('./createApplication');

describe('애플리케이션 실행 테스트', function () {
  this.timeout(10000);
  let app;

  beforeEach(() => {
    app = createApplication();
    return app.start();
  });
  afterEach(() => {
    return app.stop();
  });

  it('애플리케이션이 실행된 뒤 윈도 하나를 출력했습니다.', function () {
    return app.client.getWindowCount()
      .then(count => assert.equal(count, 1));
  });
});