import { useEffect, useRef } from 'react';
import { Engine } from "@babylonjs/core";
import {
  Sound,
  TransformNode,
  Vector3
} from '@babylonjs/core';

// eslint-disable-next-line react/prop-types
const MusicSphereZ = ({soundZIdx, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;
  const sceneRef = useRef(null);

  useEffect(() => {
    sceneRef.current = getScene();

    const trackArray = [
      "./sound/Z/Z01.mp3",
      "./sound/Z/Z02.mp3",
      "./sound/Z/Z03.mp3",
      "./sound/Z/Z04.mp3",
      "./sound/Z/Z05.mp3",
      "./sound/Z/Z06.mp3",
      "./sound/Z/Z07.mp3",
      "./sound/Z/Z09.mp3",
      "./sound/Z/Z10.mp3",
      "./sound/Z/Z11.mp3",
    ];
    const trackName = trackArray[soundZIdx];
    console.log(trackName.slice(10));

    const sphereMusicZ = new TransformNode('musicNnode');
    sphereMusicZ.position = new Vector3(248, 25, 360);

    const musicZ = new Sound(
      'Z',
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
    musicZ.onEndedObservable.add(onEnded);
    musicZ.attachToMesh(sphereMusicZ);
    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      // console.log("sphereMusicZ.dispose()");
      musicZ.stop();
      musicZ.onEndedObservable.removeCallback(onEnded);
      musicZ.dispose();

      sphereMusicZ.dispose();
    };
  }, [soundZIdx]);

  return <></>;
}

export default MusicSphereZ;