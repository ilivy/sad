import MusicSphereS from './MusicSphereS';

// eslint-disable-next-line react/prop-types
const SoundS7 = ({onEnded}) => {
  return (
    <MusicSphereS 
      onEnded={onEnded} 
      trackName="./sound/S/S-noise-dialog.mp3" 
    />
  )
}

export default SoundS7;