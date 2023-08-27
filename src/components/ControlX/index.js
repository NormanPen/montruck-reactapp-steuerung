import React from 'react';
import axios from 'axios';

class ControlX extends React.Component {
  componentDidMount() {
    // Gamepad-Status in jedem Frame aktualisieren
    this.startGamepadLoop();
  }

  componentWillUnmount() {
    // Abbruch der Gamepad-Schleife, wenn die Komponente unmontiert wird
    this.stopGamepadLoop();
  }

  startGamepadLoop = () => {
    this.gamepadLoopId = requestAnimationFrame(this.checkGamepadInput);
  };

  stopGamepadLoop = () => {
    cancelAnimationFrame(this.gamepadLoopId);
  };

  checkGamepadInput = () => {
    const gamepads = navigator.getGamepads();
    if (gamepads && gamepads.length > 0) {
      const gamepad = gamepads[0]; // Hier nehmen wir den ersten erkannten Gamepad (Index 0), Sie können hier weitere Logik hinzufügen, um den gewünschten Gamepad-Controller zu erkennen.
      if (gamepad) {
        this.handleGamepadButtons(gamepad.buttons);
      }
    }

    this.startGamepadLoop(); // Nächsten Frame anfordern
  };

  handleGamepadButtons = (buttons) => {
    // Hier können Sie die Belegung der Knöpfe an Ihre Anforderungen anpassen.
    // In diesem Beispiel nehmen wir an, dass die Knöpfe x, y, a und b wie folgt zugeordnet sind:
    // X = left, B = right, A = backward, Y = forward

    // Beispiel: Wenn Knopf X (Index 2) gedrückt wird, führen wir die Aktion "left" aus.
    if (buttons[2].pressed) {
      this.handleButtonClick('/left');
    }

    // Beispiel: Wenn Knopf B (Index 1) gedrückt wird, führen wir die Aktion "right" aus.
    if (buttons[1].pressed) {
      this.handleButtonClick('/right');
    }

    // Beispiel: Wenn Knopf A (Index 0) gedrückt wird, führen wir die Aktion "backward" aus.
    if (buttons[0].pressed) {
      this.handleButtonClick('/backward');
    }

    // Beispiel: Wenn Knopf Y (Index 3) gedrückt wird, führen wir die Aktion "forward" aus.
    if (buttons[3].pressed) {
      this.handleButtonClick('/forward');
    }
  };

  handleButtonClick = (endpoint) => {
    axios.get(`http://192.168.0.149:8000${endpoint}`)
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
        {/* Hier fügen Sie Ihre Schaltflächen für die Steuerung hinzu */}
        <button onClick={() => this.handleButtonClick('/test')}>Forward</button>
        <button onClick={() => this.handleButtonClick('/left')}>Left</button>
        <button onClick={() => this.handleButtonClick('/right')}>Right</button>
        <button onClick={() => this.handleButtonClick('/backward')}>Backward</button>
      </div>
    );
  }
}

export default ControlX;
