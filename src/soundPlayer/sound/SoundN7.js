import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN7 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_12.mp3" 
    />
  )
}

export default SoundN7;