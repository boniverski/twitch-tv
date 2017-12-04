import React from 'react';

const User = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.avatar}</div>
      <div>{props.streamInfo}</div>
    </div>
  )
}

export default User;
