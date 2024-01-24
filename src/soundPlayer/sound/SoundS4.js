import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS4 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-death02.mp3" 
    />
  )
}

export default SoundS4;