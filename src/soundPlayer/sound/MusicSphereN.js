import { useEffect } from 'react';
import { Engine } from "@babylonjs/core";
import {
  // Color3,
  Mesh,
  Sound,
  StandardMaterial,
  Vector3
} from '@babylonjs/core';

// eslint-disable-next-line react/prop-types
const MusicSphereN = ({trackName, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;

  const scene = getScene();

  useEffect(() => {

    const sphereMat = new StandardMaterial('sphereMat', scene)
    // sphereMat.diffuseColor = Color3.Purple()
    // sphereMat.backFaceCulling = false
    sphereMat.alpha = 0

    const sphereMusicN = Mesh.CreateSphere('musicsphereN', 50, 50, scene)
    sphereMusicN.material = sphereMat
    sphereMusicN.position = new Vector3(-391, 25, -27)

    const musicN = new Sound(
      'N',
      trackName,
      scene,
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
      if (musicN) {
        musicN.stop();
        musicN.onEndedObservable.removeCallback(onEnded);
      }
      if (sphereMusicN) {
        sphereMusicN.dispose();
      }
    };

  // }, [trackName, onEnded, scene]);
  }, []);
}

export default MusicSphereN;