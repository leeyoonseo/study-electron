const emojione = require('emojione');

module.exports = class EditorPage {
  constructor(client) {
    this.client = client;
  }

  inputText(text) {
    return this.client.waitForExist('#editor')
      .then(() => this.client.setValue('#editor', text));
  }

  getRenderedHTML() {
    return this.client.waitForExist('#previewer')
      .then(() => this.client.getHTML('#previewer'));
  }

  findEmojiElement(emojiName) {
    return this.client.waitForExist('#previewer')
      .then(() => {
        const src = emojione.imagePathPNG + emojione.emojioneList[`:${emojiName}:`].unicode;
        return this.client.getHTML(`#previewer img[src^='${src}.png']`);
      });
  }
}