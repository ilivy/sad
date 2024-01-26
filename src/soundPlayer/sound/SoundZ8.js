import MusicSphereZ from './MusicSphereZ';

// eslint-disable-next-line react/prop-types
const SoundZ8 = ({onEnded}) => {
  return (
    <MusicSphereZ 
      onEnded={onEnded} 
      trackName="./sound/Z/Z09.mp3" 
    />
  )
}

export default SoundZ8;