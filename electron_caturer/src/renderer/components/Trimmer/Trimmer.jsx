import React, { Component } from 'React';
import { ipcRenderer } from 'electron';
import styles from './Trimmer.css';

function position2Bounds({ x1, x2, y1, y2 }) {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  return { x, y, width, height };
}

class Trimmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClipping: false,
      clientPosition: {},
      screenPosition: {},
    };
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
  }

  // 드래그 시작
  handleOnMouseDown(e) {
    const clientPosition = {
      x1: e.clientX,
      x2: e.clientX,
      y1: e.clientY,
      y2: e.clientY,
    };

    const screenPosition = {
      x1: e.screenX,
      x2: e.screenX,
      y1: e.screenY,
      y2: e.screenY,
    };

    this.setState({
      isClipping: true,
      clientPosition,
      screenPosition,
    });
  }

  // 드래그 종료
  handleOnMouseUp() {
    this.setState({ isClipping: false });

    // 사각형 정보를 위치 정보로 변환
    const trimmedBounds = position2Bounds(this.state.screenPosition);
    if (trimmedBounds.width > 100 && trimmedBounds.height > 100) {
      // 자를 대상 위치 정보를 Main 프로세스에 전송
      ipcRenderer.send('SEND_BOUNDS', { trimmedBounds });
    }
  }

  // 드래그 진행 중
  handleOnMouseMove(e) {
    if (!this.state.isClipping) return;
    const clientPosition = this.state.clientPosition;
    const screenPosition = this.state.screenPosition;

    clientPosition.x2 = e.clientX;
    clientPosition.y2 = e.clientY;
    screenPosition.x2 = e.screenX;
    screenPosition.y2 = e.screenY;

    this.setState({
      clientPosition,
      screenPosition
    });
  }

  // 사각형 영역에 테두리를 그리는 처리
  handleOnMouseEnter(e) {
    if (!e.buttons) {
      this.setState({ isClipping: false });
    }
  }
  
  renderRect() {
    const { x, y, width, height } = position2Bounds(this.state.clientPosition);
    const inlineStyle = {
      left: x,
      top: y,
      width,
      height,
    };
    return <div calssName={styles.rect} style={inlineStyle} />;
  }

  render() {
    return (
      <div
        className={styles.root}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        onMouseEnter={this.handleOnMouseEnter}
      >
        { this.state.isClipping ? this.renderRect() : <div /> }
      </div>
    );
  }
}

export default Trimmer;