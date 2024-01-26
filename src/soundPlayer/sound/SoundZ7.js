import MusicSphereZ from './MusicSphereZ';

// eslint-disable-next-line react/prop-types
const SoundZ7 = ({onEnded}) => {
  return (
    <MusicSphereZ 
      onEnded={onEnded} 
      trackName="./sound/Z/Z07.mp3" 
    />
  )
}

export default SoundZ7;