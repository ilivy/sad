import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN6 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_09.mp3" 
    />
  )
}

export default SoundN6;