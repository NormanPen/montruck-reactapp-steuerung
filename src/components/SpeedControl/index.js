import React, { useState } from 'react';
import axios from 'axios';

function SpeedControl() {
  const [forwardSpeed, setForwardSpeed] = useState(0);
  const [backwardSpeed, setBackwardSpeed] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');

  const handleForwardSliderChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setForwardSpeed(newSpeed);

    // Server-Anfrage senden für den forward-Endpunkt
    axios.post('http://192.168.0.149:5000/forward', { speed: newSpeed })
      .then(response => {
        if (response.data) {
          setResponseMessage(response.data.message);
        } else {
          setResponseMessage('No response data available');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {

          setResponseMessage('Error: ' + error.response.data.message);
        } else {
          setResponseMessage('An error occurred');
        }
      });
  };

  const handleBackwardSliderChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setBackwardSpeed(newSpeed);

    // Server-Anfrage senden für den backward-Endpunkt
    axios.post('http://192.168.0.149:5000/backward', { speed: -newSpeed })
      .then(response => {
        if (response.data) {
          setResponseMessage(response.data.message);
        } else {
          setResponseMessage('No response data available');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setResponseMessage('Error: ' + error.response.data.message);
        } else {
          setResponseMessage('An error occurred');
        }
      });
  };

  return (
    <div>
      <h1>Speed Control</h1>
      <h2>Forward</h2>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={forwardSpeed}
        onChange={handleForwardSliderChange}
      />
      <p>Current Forward Speed: {forwardSpeed.toFixed(1)}</p>

      <h2>Backward</h2>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={backwardSpeed}
        onChange={handleBackwardSliderChange}
      />
      <p>Current Backward Speed: {-backwardSpeed.toFixed(1)}</p>

      <p>Server Response: {responseMessage}</p>
    </div>
  );
}

export default SpeedControl;
