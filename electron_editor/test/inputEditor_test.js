const assert = require('assert');
const jsdom = require('jsdom').jsdom;
const createApplication = require('./createApplication');
const EditorPage = require('./editor.page');
const { capturePage, reportLog } = require('./helper');

describe('에디터 입력 테스트', function () {
  this.timeout(10000);
  let app;

  beforeEach(() => {
    app = createApplication();
    return app.start();
  });

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      return Promise.all([
        capturePage(app, this.currentTest.title),
        reportLog(app, this.currentTest.title)
      ]).then(() => app.stop());
    }

    return app.stop();
  });

  describe('에디터에 Markdown 텍스트 입력하기', function () {
    it('html이 렌더링 되었습니다.', function () {
      const page = new EditorPage(app.client);
      return page.inputText('# h1 제목 \n ## h2 제목')
        .then(() => page.getRenderedHTML())
        .then(html => {
          const dom = jsdom(html);
          const h1 = dom.querySelector('h1');
          const h2 = dom.querySelector('h2');
          assert.equal(h1.textContent, 'h1 제목');
          assert.equal(h2.textContent, 'h2 제목');
        });
    });
  });

  describe('이모티콘 입력하기', function () {
    it('이모트콘 PNG 이미지가 렌더링 되었습니다.', function () {
      const page = new EditorPage(app.client);
      return page.inputText(':tada:')
        .then(() => page.findEmojiElement('tada'))
        .then(element => assert(!!element));
    })
  })
});