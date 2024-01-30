import { useEffect, useRef } from 'react';
import { Engine } from "@babylonjs/core";
import {
  Mesh,
  Sound,
  StandardMaterial,
  Vector3
} from '@babylonjs/core';

// eslint-disable-next-line react/prop-types
const MusicSphereN = ({soundNIdx, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);
  
  useEffect(() => {
    sceneRef.current = getScene();

    const trackArray = [
      "./sound/N/N_02.mp3",
      "./sound/N/N_03.mp3",
      "./sound/N/N_04.mp3",
      "./sound/N/N_05.mp3",
      "./sound/N/N_08.mp3",
      "./sound/N/N_09.mp3",
      "./sound/N/N_12.mp3",
      "./sound/N/N_13.mp3",
      "./sound/N/N_14.mp3",
      "./sound/N/N_15.mp3",
    ];
    const trackName = trackArray[soundNIdx];
    console.log(trackName);

    const sphereMat = new StandardMaterial('sphereMat', sceneRef.current);
    sphereMat.alpha = 0;

    const sphereMusicN = Mesh.CreateSphere('musicsphereN', 50, 50, sceneRef.current);
    sphereMusicN.material = sphereMat;
    sphereMusicN.position = new Vector3(-391, 25, -27);

    const musicN = new Sound(
      'N',
      trackName,
      sceneRef.current,
      null,
      {
          loop: false,
          autoplay: true,
          maxDistance: 700,
          useCustomAttenuation: true,
      }
    )
    musicN.onEndedObservable.add(onEnded);
    musicN.attachToMesh(sphereMusicN);

    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      // console.log("sphereMusicN.dispose()");
      musicN.stop();
      musicN.onEndedObservable.removeCallback(onEnded);
      musicN.dispose();
      sphereMusicN.dispose();
    };

  }, [soundNIdx]);

  return <></>;
}

export default MusicSphereN;