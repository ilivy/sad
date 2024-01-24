import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS3 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-ambient-death01.mp3" 
    />
  )
}

export default SoundS3;