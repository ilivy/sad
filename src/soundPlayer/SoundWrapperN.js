import React, { Suspense, useEffect, useState } from "react";
const SoundN1 = React.lazy(() => import('./sound/SoundN1'));
const SoundN2 = React.lazy(() => import('./sound/SoundN2'));
const SoundN3 = React.lazy(() => import('./sound/SoundN3'));
const SoundN4 = React.lazy(() => import('./sound/SoundN4'));

const SoundWrapperN = () => {
  const [soundNId, setSoundNId] = useState('');

  const getRandomSoundId = (curSoundId = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 4;
      return Math.floor(Math.random() * numFiles) + 1;
    };
    // console.log("curSoundId: " + curSoundId);

    let nextSoundId = "soundN" + generateRandomIdx();
    while (curSoundId == nextSoundId) {
      // console.log("once more: cur is - " + curSoundId + " next is - " + nextSoundId);
      nextSoundId = "soundN" + generateRandomIdx();
    }
    return nextSoundId;
  }
  
  useEffect(() => {
    const rsi = getRandomSoundId();
    setSoundNId(rsi);
    console.log("setSoundNId: " + rsi);
  }, []);

  const handleOnEnded = () => {
    const rsi = getRandomSoundId(soundNId);
    setSoundNId(rsi);
    console.log("setSoundNId: " + rsi);
  }

  return (
    <>
      {soundNId === "soundN1" && <Suspense><SoundN1 onEnded={handleOnEnded} /></Suspense>}
      {soundNId === "soundN2" && <Suspense><SoundN2 onEnded={handleOnEnded} /></Suspense>}
      {soundNId === "soundN3" && <Suspense><SoundN3 onEnded={handleOnEnded} /></Suspense>}
      {soundNId === "soundN4" && <Suspense><SoundN4 onEnded={handleOnEnded} /></Suspense>}
    </>
  );

};

export default SoundWrapperN;