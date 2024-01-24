import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS1 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-air.mp3" 
    />
  )
}

export default SoundS1;