import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN8 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_13.mp3" 
    />
  )
}

export default SoundN8;