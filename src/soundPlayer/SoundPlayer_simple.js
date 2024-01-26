// SoundPlayer.js

import { useEffect } from 'react';
// import { useScene } from 'babylonjs-hook';
// import { useScene } from 'react-babylonjs';
// import { useBabylonScene } from 'react-babylonjs';

import {Engine} from "@babylonjs/core";
import {
  Color3,
  Mesh,
  Sound,
  StandardMaterial,
  Vector3
} from '@babylonjs/core';


const SoundPlayer = () => {
  // const scene = useBabylonScene();
  // const { scene } = useScene();
  const getScene = () => Engine.LastCreatedScene;
  // const [soundIndex, setSoundIndex] = useState(0);

  const scene = getScene();

  const soundFiles = [
    './sound/S/S-ambient-death01.mp3',
    './sound/N/N_08.mp3',
    './sound/Z/Z01.mp3',
  ];

  useEffect(() => {
      // setSoundIndex(newIndex);

        const sphereMat = new StandardMaterial('sphereMat', scene)
        sphereMat.diffuseColor = Color3.Purple()
        sphereMat.backFaceCulling = false
        sphereMat.alpha = 0

        const sphereMusicZ = Mesh.CreateSphere('musicsphereZ', 50, 50, scene)
        sphereMusicZ.material = sphereMat
        sphereMusicZ.position = new Vector3(248, 25, 360)

        const sphereMusicN = Mesh.CreateSphere('musicsphereN', 50, 50, scene)
        sphereMusicN.material = sphereMat
        sphereMusicN.position = new Vector3(-391, 25, -27)

        const sphereMusicS = Mesh.CreateSphere('musicsphereS', 50, 50, scene)
        sphereMusicS.material = sphereMat
        sphereMusicS.position = new Vector3(307, 25, -347)

        const musicZ1 = new Sound(
            'Z',
            './sound/Z/Z11-ambient.mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        musicZ1.attachToMesh(sphereMusicZ);

        
        const musicN1 = new Sound(
            'N',
            './sound/N/N_08_chaos_x(1-2).mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        // musicN1.onEndedObservable.add(playNextSound);
        musicN1.attachToMesh(sphereMusicN);

        const musicS1 = new Sound(
            'S',
            './sound/S/S-ambient-death01.mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        musicS1.attachToMesh(sphereMusicS);

  }, [scene]);

  // return <div>Now playing: {soundFiles[soundIndex]}</div>;
  return <div>Now playing: {soundFiles[0]}</div>;
};

export default SoundPlayer;
