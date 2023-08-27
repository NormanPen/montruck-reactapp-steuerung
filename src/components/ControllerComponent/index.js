import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ControllerComponent = () => {
  const [previousLeftIntensity, setPreviousLeftIntensity] = useState(0);
  const [previousRightIntensity, setPreviousRightIntensity] = useState(0);

  useEffect(() => {
    const handleGamepadInput = (gamepad) => {
      const leftTriggerValue = gamepad.buttons[6].value; // Linker Trigger (Index 6)
      const rightTriggerValue = gamepad.buttons[7].value; // Rechter Trigger (Index 7)

      const leftIntensity = Math.round(leftTriggerValue * 10) / 10; // Runde auf 0.1 Schritte
      const rightIntensity = Math.round(rightTriggerValue * 10) / 10; // Runde auf 0.1 Schritte

      //console.log(`Linker Trigger Intensität: ${leftIntensity}`);
      //console.log(`Rechter Trigger Intensität: ${rightIntensity}`);

      if (leftIntensity !== previousLeftIntensity || (leftIntensity === 0 && previousLeftIntensity !== 0)) {
        sendSpeedToServer(leftIntensity, '/left'); // Sende den Wert an den Server mit /left Endpunkt
        setPreviousLeftIntensity(leftIntensity); // Aktualisiere den vorherigen Wert
      }

      if (rightIntensity !== previousRightIntensity || (rightIntensity === 0 && previousRightIntensity !== 0)) {
        sendSpeedToServer(rightIntensity, '/right'); // Sende den Wert an den Server mit /right Endpunkt
        setPreviousRightIntensity(rightIntensity); // Aktualisiere den vorherigen Wert
      }
    };

    const sendSpeedToServer = (speed, endpoint) => {
      const payload = { speed: speed };
      axios.post(`http://192.168.0.149:5000${endpoint}`, payload)
        .then(response => {
          console.log(`POST erfolgreich (${endpoint}):`, response.data);
        })
        .catch(error => {
          console.error(`Fehler beim POST (${endpoint}):`, error);
        });
    };

    const gamepadConnected = (event) => {
      const gamepad = event.gamepad;
      console.log(`Gamepad ${gamepad.index} verbunden: ${gamepad.id}`);
      requestAnimationFrame(updateGamepadState);
    };

    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();
      if (gamepads[0]) {
        handleGamepadInput(gamepads[0]);
      }
      requestAnimationFrame(updateGamepadState);
    };

    window.addEventListener('gamepadconnected', gamepadConnected);

    return () => {
      window.removeEventListener('gamepadconnected', gamepadConnected);
    };
  }, []);


};

export default ControllerComponent;
