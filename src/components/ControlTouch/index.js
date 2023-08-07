import React from 'react';

class ControlTouch extends React.Component {
  handleButtonClick = (endpoint) => {
    fetch(`http://localhost:8080${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.text(); // Hier verwenden wir response.text(), da wir Text statt JSON erwarten
      })
      .then((data) => {
        console.log(`Response from ${endpoint}: ${data}`);
        // Hier können Sie auf die Antwortdaten zugreifen (data) und entsprechend reagieren
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


export default ControlTouch;
