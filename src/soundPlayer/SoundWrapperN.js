import React, { useEffect, useState } from "react";
import MusicSphereN from './MusicSphereN';

const SoundWrapperN = () => {
  const [soundNIdx, setSoundNIdx] = useState(0);

  const getRandomSoundIdx = (curSoundIdx = null) => {

    const generateRandomIdx = () => {
      // Generates a random index within the number of mp3 files
      const numFiles = 10;
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
    setSoundNIdx(rsi);
    // console.log("setSoundNIdx: " + rsi);
  }, []);

  const handleOnEnded = () => {
    const rsi = getRandomSoundIdx(soundNIdx);
    setSoundNIdx(rsi);
    // console.log("setSoundNIdx: " + rsi);
  }

  return (
    <MusicSphereN soundNIdx={soundNIdx} onEnded={handleOnEnded} />
  );

};

export default SoundWrapperN;