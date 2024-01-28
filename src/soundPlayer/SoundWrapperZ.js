import React, { useEffect, useState } from "react";
import MusicSphereZ from './MusicSphereZ';

const SoundWrapperZ = () => {
  const [soundZIdx, setSoundZIdx] = useState(0);

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
    setSoundZIdx(rsi);
    console.log("setSoundZIdx: " + rsi);
  }, []);


  const handleOnEnded = () => {
    const rsi = getRandomSoundIdx(soundZIdx);
    setSoundZIdx(rsi);
    console.log("setSoundZIdx: " + rsi);
  }

  // const handleOnEnded = useCallback(() => {
  //   const rsi = getRandomSoundIdx(soundZIdx);
  //   setSoundZIdx(rsi);
  //   console.log("setSoundZIdx: " + rsi);
  // }, [soundZIdx])

  return (
    <MusicSphereZ soundZIdx={soundZIdx} onEnded={handleOnEnded} />
  );

};

export default SoundWrapperZ;