import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import Previewer from '../Previewer/Previewer';

class PDFUI extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    const text = ipcRenderer.sendSync('REQUEST_TEXT');
    this.setState({ text });
  }
  render() {
    return (
      <Previewer value={this.state.text} />
    );
  }
}

export default PDFUI;