import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS2 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-Brecht.mp3" 
    />
  )
}

export default SoundS2;