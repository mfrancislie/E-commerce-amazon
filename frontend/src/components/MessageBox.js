import React from 'react';

const MessageBox = (props) => {
  return <div className={`alert alert-${props.variant}`}>{props.children}</div>;
};

export default MessageBox;
