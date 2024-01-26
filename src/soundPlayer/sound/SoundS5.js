import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS5 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-dino.mp3" 
    />
  )
}

export default SoundS5;