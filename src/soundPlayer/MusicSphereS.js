import { useEffect, useRef } from 'react';
import { Engine } from "@babylonjs/core";
import {
  Sound,
  TransformNode,
  Vector3
} from '@babylonjs/core';

// eslint-disable-next-line react/prop-types
const MusicSphereS = ({soundSIdx, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);

  useEffect(() => {
    sceneRef.current = getScene();

    const trackArray = [
      "./sound/S/S-ambient-air.mp3",
      "./sound/S/S-ambient-Brecht.mp3",
      "./sound/S/S-ambient-death01.mp3",
      "./sound/S/S-ambient-death02.mp3",
      "./sound/S/S-ambient-dino.mp3",
      "./sound/S/S-ambient-spektakl.mp3",
      "./sound/S/S-noise-dialog.mp3",
      "./sound/S/S-noise01V2.mp3",
      "./sound/S/S-short_time1936.mp3",
    ];
    const trackName = trackArray[soundSIdx];
    console.log(trackName.slice(10));

    const sphereMusicS = new TransformNode('musicNnode');
    sphereMusicS.position = new Vector3(307, 25, -347);

    const musicS = new Sound(
      'S',
      trackName,
      sceneRef.current,
      null,
      {
        autoplay: true,
        loop: false,
        volume: 0.9,
        maxDistance: 700,
        spatialSound: true,
      }
    )
    musicS.onEndedObservable.add(onEnded);
    musicS.attachToMesh(sphereMusicS);

    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      // console.log("sphereMusicS.dispose()");
      musicS.stop();
      musicS.onEndedObservable.removeCallback(onEnded);
      musicS.dispose();

      sphereMusicS.dispose();
    };
  }, [soundSIdx]);

  return <></>;
}

export default MusicSphereS;