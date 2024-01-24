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
const MusicSphereZ = ({trackName, onEnded}) => {
  const getScene = () => Engine.LastCreatedScene;

  const scene = getScene();

  useEffect(() => {

    const sphereMat = new StandardMaterial('sphereMat', scene)
    sphereMat.diffuseColor = Color3.Purple()
    sphereMat.backFaceCulling = false
    sphereMat.alpha = 0

    const sphereMusicZ = Mesh.CreateSphere('musicsphereZ', 50, 50, scene)
    sphereMusicZ.material = sphereMat
    sphereMusicZ.position = new Vector3(248, 25, 360)

    const musicZ = new Sound(
      'Z',
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
    musicZ.onEndedObservable.add(onEnded);
    musicZ.attachToMesh(sphereMusicZ);
    return () => {
      // Cleanup: Stop playing sound and remove sphere when component unmounts
      if (musicZ) {
        musicZ.stop();
        musicZ.onEndedObservable.removeCallback(onEnded);
      }
      if (sphereMusicZ) {
        sphereMusicZ.dispose();
      }
    };
    // }, [trackName, onEnded, scene]);
  }, []);
}

export default MusicSphereZ;