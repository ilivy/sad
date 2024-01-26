import MusicSphereN from './MusicSphereN';

// eslint-disable-next-line react/prop-types
const SoundN1 = ({onEnded}) => {
  return (
    <MusicSphereN 
      onEnded={onEnded} 
      trackName="./sound/N/N_02.mp3" 
    />
  )
}

export default SoundN1;