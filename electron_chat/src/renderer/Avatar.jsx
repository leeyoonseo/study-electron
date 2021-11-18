import React from 'react';

const ABATAR_STYLE = {
  width: 32,
  textAlign: 'center',
  fontSize: 24
};

function Avatar(props) {
  const { photoURL } = props.user;
  if (photoURL) {
    // photoURL 설정된 경우 img 요소 출력하기
    return <img className="img-rounded" src={photoURL} style={ABATAR_STYLE} />
  } else {
    // photoURL이 설정되어 있지 않은 경우 대체 icon출력
    return (
      <div style={ABATAR_STYLE}>
        <span className="icon icon-user" />
      </div>
    )
  }
}

export default Avatar;