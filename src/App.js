import ControlBtn from "./components/ControlBtn";
import ControlTouch from "./components/ControlTouch";
import ControlX from "./components/ControlX";
import ControllerComponent from "./components/ControllerComponent";
import LinkerStick from "./components/LinkerStick";
import SpeedControl from "./components/SpeedControl";


function App() {
  return (
    <div >
      <ControlBtn />
      <ControlX />
      <ControlTouch />
      <ControllerComponent />
      <SpeedControl />
 
    </div>
  );
}

export default App;
