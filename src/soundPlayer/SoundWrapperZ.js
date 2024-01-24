import React, { Suspense, useEffect, useState } from "react";
const SoundZ1 = React.lazy(() => import('./sound/SoundZ1'));
const SoundZ2 = React.lazy(() => import('./sound/SoundZ2'));
const SoundZ3 = React.lazy(() => import('./sound/SoundZ3'));
const SoundZ4 = React.lazy(() => import('./sound/SoundZ4'));

const SoundWrapperZ = () => {
  const [soundZId, setSoundZId] = useState('');

  const getRandomSoundId = (curSoundId = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 4;
      return Math.floor(Math.random() * numFiles) + 1;
    };
    // console.log("curSoundId: " + curSoundId);

    let nextSoundId = "soundZ" + generateRandomIdx();
    while (curSoundId == nextSoundId) {
      // console.log("once more: cur is - " + curSoundId + " next is - " + nextSoundId);
      nextSoundId = "soundZ" + generateRandomIdx();
    }
    return nextSoundId;
  }
  
  useEffect(() => {
    const rsi = getRandomSoundId();
    setSoundZId(rsi);
    console.log("setSoundNId: " + rsi);
  }, []);

  const handleOnEnded = () => {
    const rsi = getRandomSoundId(soundZId);
    setSoundZId(rsi);
    console.log("setSoundZId: " + rsi);
  }

  return (
    <>
      {soundZId === "soundZ1" && <Suspense><SoundZ1 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ2" && <Suspense><SoundZ2 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ3" && <Suspense><SoundZ3 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ4" && <Suspense><SoundZ4 onEnded={handleOnEnded} /></Suspense>}
    </>
  );

};

export default SoundWrapperZ;