import React from 'react';

const ERRORS_STYLE = {
  padding: 10,
  marginBottom: 30,
  borderRadius: 5,
  color: '#e62626',
  backgroundColor: '#ffdddf',
};

function Errors(props) {
  const { errorMessages } = props;
  if(!errorMessages || !errorMessages.length) {
    return null;
  }

  return (
    <div style={ERRORS_STYLE}>
      {errorMessages.map(e => <div key={e}>{e}</div>)}
    </div>
  );
}

export default Errors;