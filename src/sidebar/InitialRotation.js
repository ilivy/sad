import { useEffect, useRef } from 'react';
import { Engine } from "@babylonjs/core";
import { Vector3 } from '@babylonjs/core';
import { useButtonContext } from "../App";

const InitialRotation = () => {
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);

  // console.log('Initial rotation');

  // Initial rotation, on the first loading
  const { isInitRotation } = useButtonContext();

  // is used for Initial rotation
  const intervalInitRotationRef = useRef(null);

  useEffect(() => {
    sceneRef.current = getScene();

    if (isInitRotation) {
      let coordX = 5;
      let coordZ = 5;
      const radius = 10;
      let angle = 225;  // Initial the Camera's target is (-5, 20, -5)
      intervalInitRotationRef.current = setInterval(() => {
        angle = (angle + 0.1) % 360;
        angle = Math.round(angle * 10) / 10;
        coordX = radius * Math.cos(Math.PI * 2 * angle / 360);
        coordX = Math.round(coordX * 100) / 100;
        coordZ = radius * Math.sin(Math.PI * 2 * angle / 360);
        coordZ = Math.round(coordZ * 100) / 100;
        // console.log(angle);
        // console.log('Points coors are  x='+ coordX +', z=' + coordZ)
        sceneRef.current.activeCamera.target = new Vector3(
          coordX,
          20,
          coordZ);
      }, 50);  // 50 is a perfect speed
    }

    return () => {
      if (intervalInitRotationRef.current) {
        clearInterval(intervalInitRotationRef.current);
      }
    }

  }, [isInitRotation]);

  return <></>
}

export default InitialRotation;