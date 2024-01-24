import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN2 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_08.mp3" 
    />
  )
}

export default SoundN2;