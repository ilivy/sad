import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS8 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-noise01V2.mp3" 
    />
  )
}

export default SoundS8;