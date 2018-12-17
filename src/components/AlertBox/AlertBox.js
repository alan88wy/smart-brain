import React from 'react';
import './AlertBox.css';

const AlertBox = ({ mes }) => {
  return (
    <div className='red f3'>
      {mes}
    </div>
  );
}

export default AlertBox;