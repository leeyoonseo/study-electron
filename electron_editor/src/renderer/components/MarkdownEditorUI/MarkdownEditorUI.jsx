import React, { Component } from 'react';
import Editor from '../Editor/Editor';
import Previewer from '../Previewer/Previewer';
import style from './MarkdownEditorUI.css';

class MarkdownEditorUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.onChangeText = this.onChangeText.bind(this); 
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className={style.markdownEditor}>
        <Editor 
          className={style.editorArea}
          value={this.state.text}
          onChange={this.onChangeText}
        />
        <Previewer 
          className={style.PreviewerArea}
          value={this.state.text}
        />
      </div>
    );
  }
}

export default MarkdownEditorUI;