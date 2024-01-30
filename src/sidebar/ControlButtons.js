import { useState, useEffect, useRef } from 'react';
import { Engine } from "@babylonjs/core";
import { Vector3 } from '@babylonjs/core';
import { useButtonContext } from "../App";
import "./ControlButtons.css";

const ControlButtons = () => {
  // "Autopilot" mode, set in the Main menu
  const { isAutopilotOn, setIsAutopilotOn } = useButtonContext();
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);

  // direction of Camera movement, set by clicking control buttons
  const [movingDirection, setMovingDirection] = useState('Stop');
  
  // is used for control buttons
  const intervalDirectionRef = useRef(null);

  // is used for "Autopilot" mode
  const intervalAutopilotRef = useRef(null);
  const intervalAutopilotStepRef = useRef(null);
  const intervalAutopilotTurnRef = useRef(null);

  

  useEffect(() => {
    sceneRef.current = getScene();
    const verticalLevel = 20;

    // *** AUTOPILOT ***

    if (isAutopilotOn) {
      setMovingDirection('Stop');

      const findNewCameraDirection = () => {
        // Detects a new direction
        // where camera can go now
        // main challenge: not to go far away from the center
        // returns: new coordinates: X and Z with values between -400 and 400

        const x = sceneRef.current.activeCamera.position.x;
        const z = sceneRef.current.activeCamera.position.z;
        // Random num in (0, 400)
        const random_0_400 = () => {return Math.floor(Math.random() * 400)};
        // Random num in (-400, 0)
        const random_m400_0 = () => {return Math.floor(Math.random() * 400) - 400};
        let randomX;
        let randomZ;

        if (x > 0 && z > 0) {
          // Go to Left Bottom
          randomX = random_m400_0();
          randomZ = random_m400_0();
        }
        if (x < 0 && z > 0) {
          // Go to Top Left
          randomX = random_0_400();
          randomZ = random_m400_0();

        }
        if (x < 0 && z < 0) {
          // Go to Top Right
          randomX = random_0_400();
          randomZ = random_0_400();
        }
        if (x > 0 && z < 0) {
          // Go to Bottom Right
          randomX = random_m400_0();
          randomZ = random_0_400();
        }

        return {randomX, randomZ}
      };

      const autopilotOneTurn = (nextX, nextZ) => {
        // Makes a step of rotation 
        // to point camera to the new Vector
        // with desired nextX, nextZ coordinates

        const curX = sceneRef.current.activeCamera.target.x;
        const curZ = sceneRef.current.activeCamera.target.z;

        const deltaX = (nextX - curX) / 100;
        const deltaZ = (nextZ - curZ) / 100;

        // console.log("deltaX :" + deltaX);
        // console.log("deltaZ :" + deltaZ);

        sceneRef.current.activeCamera.target = new Vector3(
          curX + deltaX,
          verticalLevel,
          curZ + deltaZ);

        // One step forward
        autopilotOneStep();
      }

      const autopilotOneStep = () => {
        // Makes one step forward
        const distanceToMove = 1;  // 1 is a perfect speed
        const amount = 0.2;  // 0.2 is a perfect speed
        const frontPosition = sceneRef.current.activeCamera.getFrontPosition(distanceToMove);
        frontPosition.y = verticalLevel;

        sceneRef.current.activeCamera.position = Vector3.Lerp(
          sceneRef.current.activeCamera.position,
          frontPosition,
          amount
        );
      }

      const autopilotSetNextMovement = () => {
        // Main "Autopilot" mode handler
        //
        // runs every 5 seconds
        // checks if we are far away from the center
        // if yes: sets interval to turn closer to the center slowly
        // if no: sets interval to go forward slowly

        if (sceneRef.current.activeCamera.position.length() > 300
            || Math.random() > 0.8) {
          clearInterval(intervalAutopilotStepRef.current);
          clearInterval(intervalAutopilotTurnRef.current);

          const {randomX, randomZ} = findNewCameraDirection();
          // console.log(randomX, randomZ);

          intervalAutopilotTurnRef.current = setInterval(() => {
            autopilotOneTurn(randomX, randomZ);
          }, 100);  // 100 is a perfect speed

        } else {
          clearInterval(intervalAutopilotStepRef.current);
          clearInterval(intervalAutopilotTurnRef.current);

          intervalAutopilotStepRef.current = setInterval(() => {
            autopilotOneStep();
          }, 100);  // 100 is a perfect speed
        }
      }

      // main Autopilot processor
      autopilotSetNextMovement();

      intervalAutopilotRef.current = setInterval(() => {
        autopilotSetNextMovement();
      }, 5000);
    }


    // *** CONTROL BUTTONS (Up, Down, Right, Left) ***

    if (movingDirection == "GoUp" || movingDirection == "GoDown") {
      intervalDirectionRef.current = setInterval(() => {

        let distanceToMove = 2;
        if (movingDirection == "GoDown") {
          distanceToMove = - 2;
        }

        const amount = 1;
        const frontPosition = sceneRef.current.activeCamera.getFrontPosition(distanceToMove);
        frontPosition.y = verticalLevel;

        sceneRef.current.activeCamera.position = Vector3.Lerp(
          sceneRef.current.activeCamera.position,
          frontPosition,
          amount
        );

      }, 100);
    }

    if (movingDirection == "GoLeft") {
      console.log("current position: " + sceneRef.current.activeCamera.position);
      console.log("current length: " + sceneRef.current.activeCamera.position.length());

      intervalDirectionRef.current = setInterval(() => {

      sceneRef.current.activeCamera.position.addInPlace(
        sceneRef.current.activeCamera.getDirection(Vector3.Left())
      );

      }, 100);
    }
    
    if (movingDirection == "GoRight") {
      intervalDirectionRef.current = setInterval(() => {

      sceneRef.current.activeCamera.position.addInPlace(
        sceneRef.current.activeCamera.getDirection(Vector3.Right())
      );

      }, 100);
    }

    return () => {
      if (intervalAutopilotRef.current) {
        clearInterval(intervalAutopilotRef.current);
      }
      if (intervalAutopilotStepRef.current) {
        clearInterval(intervalAutopilotStepRef.current);
      }
      if (intervalAutopilotTurnRef.current) {
        clearInterval(intervalAutopilotTurnRef.current);
      }
      if (intervalDirectionRef.current) {
        clearInterval(intervalDirectionRef.current);
      }
    };
  }, [movingDirection, isAutopilotOn]);


  const handleButtonClick = (direction) => {

    setIsAutopilotOn(false);
    setMovingDirection(direction);

  };

  return (
    <div className="control-buttons-wrap">
      <div>
        <button onClick={() => { handleButtonClick("GoUp")}}>↑</button>
      </div>
      <div className="control-buttons-middle">
        <button onClick={() => { handleButtonClick("GoLeft")}}>←</button>
        <button onClick={() => { handleButtonClick("Stop")}} className="pause-icon">||</button>
        <button onClick={() => { handleButtonClick("GoRight")}}>→</button>
      </div>
      <div>
        <button onClick={() => { handleButtonClick("GoDown")}}>↓</button>
      </div>
    </div>
  )
}

export default ControlButtons;
