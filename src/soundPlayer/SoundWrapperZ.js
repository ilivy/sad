import React, { Suspense, useEffect, useState } from "react";
const SoundZ1 = React.lazy(() => import('./sound/SoundZ1'));
const SoundZ2 = React.lazy(() => import('./sound/SoundZ2'));
const SoundZ3 = React.lazy(() => import('./sound/SoundZ3'));
const SoundZ4 = React.lazy(() => import('./sound/SoundZ4'));
const SoundZ5 = React.lazy(() => import('./sound/SoundZ5'));
const SoundZ6 = React.lazy(() => import('./sound/SoundZ6'));
const SoundZ7 = React.lazy(() => import('./sound/SoundZ7'));
const SoundZ8 = React.lazy(() => import('./sound/SoundZ8'));
const SoundZ9 = React.lazy(() => import('./sound/SoundZ9'));
const SoundZ10 = React.lazy(() => import('./sound/SoundZ10'));

const SoundWrapperZ = () => {
  const [soundZId, setSoundZId] = useState('');

  const getRandomSoundId = (curSoundId = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 10;
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
    console.log("setSoundZId: " + rsi);
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
      {soundZId === "soundZ5" && <Suspense><SoundZ5 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ6" && <Suspense><SoundZ6 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ7" && <Suspense><SoundZ7 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ8" && <Suspense><SoundZ8 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ9" && <Suspense><SoundZ9 onEnded={handleOnEnded} /></Suspense>}
      {soundZId === "soundZ10" && <Suspense><SoundZ10 onEnded={handleOnEnded} /></Suspense>}
    </>
  );

};

export default SoundWrapperZ;