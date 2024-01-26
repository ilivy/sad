import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN10 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_15.mp3" 
    />
  )
}

export default SoundN10;