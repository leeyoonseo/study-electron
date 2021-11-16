import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import RoomItem from './RoomItem';
import firebase from 'firebase/firebase-browser';

const ICON_CHAT_STYLE = {
  fontSize: 120,
  color: '#ddd',
};

const FORM_STYLE = {
  display: 'flex',
};

const BUTTON_STYLE = {
  marginLeft: 10,
};

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: '',
      rooms: []
    };

    this.db = firebase.database();
    this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this); 
    this.handleOnSubmit = this.handleOnSubmit.bind(this); 
  }

  componentDidMount() {
    // 컴포넌트 초기화때 채팅방 목록 추출
    this.fetchRooms();
  }

  handleOnChangeRoomName(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  // 새 채팅방 만들기 처리
  handleOnSubmit(e) {
    const { roomName } = this.state;
    e.preventDefault();
    if (!roomName.length) {
      return;
    }

    // Firebase 데이터베이스에 새로운 채팅방 데이터 만들기
    // ref = JSON 트리의 chatrooms 객체 참조
    const newRoomRef = this.db.ref('/chatrooms').push();
    const newRoom = {
      description: roomName
    };

    // 생성한 채팅방의 description 변경
    newRoomRef
      .update(newRoom)
      .then(() => {
        // 상태 초기화
        this.setState({
          roomName: ''
        });

        // 채팅방 목록 다시 가져오기
        return this.fetchRooms().then(() => {
          // 오른쪽 패널을 생성한 상세 화면으로 변경하기
          hashHistory.push(`/rooms/${newRoomRef.key}`);
        });
      });
  }

  // 채팅방 목록 추출 처리
  fetchRooms() {
    // Firebase 데이터베이스에서 채팅방 20개 가져오기
    // limitToLast = 최근 20개 데이터만 추출하게 한정
    // once = 쿼리를 실행한다. 이 쿼리는 한번만 평가된다.
    return this.db.ref('/chatrooms').limitToLast(20).once('value')
      .then(snapshot => {
        const rooms = [];
        snapshot.forEach(item => {
          // 데이터베이스에서 추출한 데이터를 객체로 할당하기
          rooms.push(
            Object.assign({ key: item.key }, item.val())
          );
        });

        // 가져온 객체 배열을 컴포넌트 state에 설정
        this.setState({ rooms });
      });
  }

  // 왼쪽 패널(채팅방 목록) 렌더링 처리
  renderRoomList() {
    const { roomId } = this.props.params;
    const { rooms, roomName } = this.state;

    return (
      <div className="list-group">
        {rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} /> )}
        <div className="list-group-header">
          <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
            <input 
              type="text"
              className="form-control"
              placeholder="New room"
              onChange={this.handleOnChangeRoomName}
              value={roomName}
            />
            <button className="btn btn-default" style={BUTTON_STYLE}>
              <span className="icon ico-plus" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 오른쪽 패널(채팅방 상세) 렌더링 처리
  renderRoom() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <div className="text-center">
          <div style={ICON_CHAT_STYLE}>
            <span className="icon icon-chat" />
          </div>
          <p>
            Join a chat room from the sidebar or create your chat room.
          </p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="pane-group">
        <div className="pane-sm sidebar">
          {this.renderRoomList()}
        </div>
        <div className="pane">
          {this.renderRoom()}
        </div>
      </div>
    );
  }
}

export default Rooms;