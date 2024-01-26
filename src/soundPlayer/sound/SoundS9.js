import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS9 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-short_time1936.mp3" 
    />
  )
}

export default SoundS9;