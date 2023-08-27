import React, { useEffect, useState } from 'react';

const LinkerStick = () => {
  const [intensityX, setIntensityX] = useState(0);
  const [intensityY, setIntensityY] = useState(0);

  useEffect(() => {
    const handleGamepadInput = (gamepad) => {
      const stickX = gamepad.axes[0]; // X-Achse des linken Sticks
      const stickY = gamepad.axes[1]; // Y-Achse des linken Sticks

      const newIntensityX = Math.round(stickX * 10) / 10; // Runde auf 0.1 Schritte
      const newIntensityY = Math.round(stickY * 10) / 10; // Runde auf 0.1 Schritte

      console.log(`Linker Stick X-Intensität: ${newIntensityX}`);
      console.log(`Linker Stick Y-Intensität: ${newIntensityY}`);

      setIntensityX(newIntensityX);
      setIntensityY(newIntensityY);
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

  return (
    <div>
      <p>Bewege den linken Stick des Controllers.</p>
      <p>Linker Stick X-Intensität: {intensityX}</p>
      <p>Linker Stick Y-Intensität: {intensityY}</p>
    </div>
  );
};

export default LinkerStick;
