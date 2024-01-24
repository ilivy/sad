import React, { Suspense, useEffect, useState } from "react";
const SoundS1 = React.lazy(() => import('./sound/SoundS1'));
const SoundS2 = React.lazy(() => import('./sound/SoundS2'));
const SoundS3 = React.lazy(() => import('./sound/SoundS3'));
const SoundS4 = React.lazy(() => import('./sound/SoundS4'));

const SoundWrapperS = () => {
  const [soundSId, setSoundSId] = useState('');

  const getRandomSoundId = (curSoundId = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 4;
      return Math.floor(Math.random() * numFiles) + 1;
    };
    // console.log("curSoundId: " + curSoundId);

    let nextSoundId = "soundS" + generateRandomIdx();
    while (curSoundId == nextSoundId) {
      // console.log("once more: cur is - " + curSoundId + " next is - " + nextSoundId);
      nextSoundId = "soundS" + generateRandomIdx();
    }
    return nextSoundId;
  }
  
  useEffect(() => {
    const rsi = getRandomSoundId();
    setSoundSId(rsi);
    console.log("setSoundSId: " + rsi);
  }, []);

  const handleOnEnded = () => {
    const rsi = getRandomSoundId(soundSId);
    setSoundSId(rsi);
    console.log("setSoundSId: " + rsi);
  }

  return (
    <>
      {soundSId === "soundS1" && <Suspense><SoundS1 onEnded={handleOnEnded} /></Suspense>}
      {soundSId === "soundS2" && <Suspense><SoundS2 onEnded={handleOnEnded} /></Suspense>}
      {soundSId === "soundS3" && <Suspense><SoundS3 onEnded={handleOnEnded} /></Suspense>}
      {soundSId === "soundS4" && <Suspense><SoundS4 onEnded={handleOnEnded} /></Suspense>}
    </>
  );

};

export default SoundWrapperS;