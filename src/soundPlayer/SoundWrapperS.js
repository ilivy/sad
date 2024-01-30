import React, { useEffect, useState } from "react";
import MusicSphereS from './MusicSphereS';

const SoundWrapperS = () => {
  const [soundSIdx, setSoundSIdx] = useState(0);

  const getRandomSoundIdx = (curSoundIdx = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 9;
      return Math.floor(Math.random() * numFiles);
    };
    // console.log("curSoundIdx: " + curSoundIdx);

    let nextSoundIdx = generateRandomIdx();
    while (curSoundIdx == nextSoundIdx) {
      // console.log("once more: cur is - " + curSoundIdx + " next is - " + nextSoundIdx);
      nextSoundIdx = generateRandomIdx();
    }
    return nextSoundIdx;
  }
  
  useEffect(() => {
    const rsi = getRandomSoundIdx();
    setSoundSIdx(rsi);
    // console.log("setSoundSIdx: " + rsi);
  }, []);

  const handleOnEnded = () => {
    const rsi = getRandomSoundIdx(soundSIdx);
    setSoundSIdx(rsi);
    // console.log("setSoundSIdx: " + rsi);
  }

  return (
    <MusicSphereS soundSIdx={soundSIdx} onEnded={handleOnEnded} />
  );

};

export default SoundWrapperS;