import React, { useEffect, useRef } from 'react';
import { Engine } from '@babylonjs/core';
import { Sound, TransformNode, Vector3 } from '@babylonjs/core';

const SoundWrapperForest = () => {
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);

  useEffect(() => {
    sceneRef.current = getScene();

    const sphereForest = new TransformNode('musicFnode', sceneRef.current);
    sphereForest.position = new Vector3(0, 25, 0);

    const musicForest = new Sound(
      "forest",
      "./sound/forest/start.mp3",
      sceneRef.current,
      null,
      {
        autoplay: true,
        loop: true,
        volume: 0.5,
        maxDistance: 2000,
      }
    )
    musicForest.attachToMesh(sphereForest);

    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      // console.log("sphereMusicN.dispose()");
      musicForest.stop();
      musicForest.dispose();
      sphereForest.dispose();
    }
  })

  return <></>;
}

export default SoundWrapperForest;
