import React, { Component } from 'react';
import Message from './Message';
import NewMessage from './NewMessage';
import firebase from 'firebase/firebase-browser';

const ROOM_STYLE = {
  padding: '10px 30px',
};

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      messages: [],
    };

    this.db = firebase.database();
    this.handleMessagePost = this.handleMessagePost.bind(this); 
  }

  componentDidMount() {
    const { roomId } = this.props.params;
    // 컴포넌트 초기화 때 채팅방 상세 정보 추출
    this.fetchRoom(roomId);
  }

  // @deplicated
  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps.params;
    if (roomId === this.props.params.roomId) {
      // 채팅방 id로 변환할 수 없다면 아무것도 하지 않기
      return;
    }
    if (this.stream) {
      // 메시지 감시 제거하기
      this.stream.off();
    }
    // state 다시 초기화하기
    this.setState({
      message: [],
    });
    // 채팅방 상세 다시 추출
    this.fetchRoom(roomId);
  }

  componentDidUpdate() {
    setTimeout(() => {
      // 화면 아래로 스크롤하기
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  componentDidUnmount() {
    if (this.stream) {
      // 메시지 감시 제거하기
      this.stream.off();
    }
  }

  handleMessagePost() {
    const newItemRef = this.fbChatRoomRef.child('message').push();
    // Firebase에 로그인한 사용자를 입력 사용자로 사용하기
    this.user = this.user || firebase.auth().currentUser;
    return newItemRef.update({
      writtenBy: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
      },
      time: Date.now(),
      text: message,
    });
  }

  fetchRoom(roomId) {
    // Firebase 데이터 베이스에서 채팅방 상세 데이터 참조 추출
    this.fbChatRoomRef = this.db.ref(`/chatrooms/${roomId}`);
    this.fbChatRoomRef.once('value').then(snapshot => {
      const { description } = snapshot.val();
      this.setState({ description });
      window.document.title = description;
    });

    this.stream = this.fbChatRoomRef.child('messages').limitToLast(10);
    // 채팅방의 메시지 추가 감시하기
    this.stream.on('child_added', item => {
      const { messages } = this.state || [];
      // 추가된 메세지를 state에 할당
      messages.push(Object.assign({ key: item }, item.val()));
      this.setState({ messages });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={ROOM_STYLE} ref={room => this.room = room}> 
        <div className="list-group">
          {messages.map(m => <Message key={m.key} message={m} />)}
        </div>
        <NewMessage onMessagePost={this.handleMessagePost} />
      </div>
    );
  }
}

export default Room;