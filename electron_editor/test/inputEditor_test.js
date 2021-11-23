const assert = require('assert');
const createApplication = require('./createApplication');
const EditorPage = require('./editor.page');
const jsdom = require('jsdom').jsdom;

describe('에디터 입력 테스트', function () {
  this.timeout(10000);
  let app;

  beforeEach(() => {
    app = createApplication();
    return app.start();
  });
  afterEach(() => {
    return app.stop();
  });

  describe('에디터에 Markdown 텍스트 입력하기', function () {
    it('html이 렌더링 되었습니다.', function () {
      const page = new EditorPage(app.client);
      return page.inputText('# h1 제목 \n ## h2 제목')
        .then(html => {
          const dom = jsdom(html);
          const h1 = dom.querySelector('h1');
          const h2 = dom.querySelector('h2');
          assert.equal(h1.textContent, 'h1 제목');
          assert.equal(h2.textContent, 'h2 제목');
        });
    });
  });
});