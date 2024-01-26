import MusicSphereZ from './MusicSphereZ';

// eslint-disable-next-line react/prop-types
const SoundZ10 = ({onEnded}) => {
  return (
    <MusicSphereZ 
      onEnded={onEnded} 
      trackName="./sound/Z/Z11.mp3" 
    />
  )
}

export default SoundZ10;