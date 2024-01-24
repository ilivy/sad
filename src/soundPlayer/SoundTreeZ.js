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

const SoundTreeZ = () => {
  const getScene = () => Engine.LastCreatedScene;
  const scene = getScene();

}

export default SoundTreeZ;