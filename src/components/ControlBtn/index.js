import React from 'react';
import axios from 'axios';

class ControlBtn extends React.Component {
  handleButtonClick = (endpoint) => {
    axios.get(`http://localhost:8080${endpoint}`)
      .then(() => {
        console.log(`GET request to ${endpoint} successful.`);
      })
      .catch((error) => {
        console.error(`Error while making GET request to ${endpoint}:`, error);
      });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleButtonClick('/forward')}>Forward</button>
        <button onClick={() => this.handleButtonClick('/left')}>Left</button>
        <button onClick={() => this.handleButtonClick('/right')}>Right</button>
        <button onClick={() => this.handleButtonClick('/backward')}>Backward</button>
      </div>
    );
  }
}

export default ControlBtn;
