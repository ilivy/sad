import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS6 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-spektakl.mp3" 
    />
  )
}

export default SoundS6;