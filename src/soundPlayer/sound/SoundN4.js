import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN4 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_05.mp3" 
    />
  )
}

export default SoundN4;