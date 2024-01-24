import { useEffect } from 'react';
import { Engine } from "@babylonjs/core";
import {
  Color3,
  Mesh,
  Sound,
  StandardMaterial,
  Vector3
} from '@babylonjs/core';

// eslint-disable-next-line react/prop-types
const MusicSphereS = ({trackName, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;

  const scene = getScene();

  useEffect(() => {

    const sphereMat = new StandardMaterial('sphereMat', scene)
    sphereMat.diffuseColor = Color3.Purple()
    sphereMat.backFaceCulling = false
    sphereMat.alpha = 0

    const sphereMusicS = Mesh.CreateSphere('musicsphereS', 50, 50, scene)
    sphereMusicS.material = sphereMat
    sphereMusicS.position = new Vector3(307, 25, -347)

    const musicS = new Sound(
      'S',
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
    musicS.onEndedObservable.add(onEnded);
    musicS.attachToMesh(sphereMusicS);

    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      if (musicS) {
        musicS.stop();
        musicS.onEndedObservable.removeCallback(onEnded);
      }
      if (sphereMusicS) {
        sphereMusicS.dispose();
      }
    };
    // }, [trackName, onEnded, scene]);
  }, []);
}

export default MusicSphereS;