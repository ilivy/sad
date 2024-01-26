import MusicSphereZ from './MusicSphereZ';

// eslint-disable-next-line react/prop-types
const SoundZ6 = ({onEnded}) => {
  return (
    <MusicSphereZ 
      onEnded={onEnded} 
      trackName="./sound/Z/Z06.mp3" 
    />
  )
}

export default SoundZ6;