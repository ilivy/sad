import MusicSphereZ from './MusicSphereZ';

// eslint-disable-next-line react/prop-types
const SoundZ9 = ({onEnded}) => {
  return (
    <MusicSphereZ 
      onEnded={onEnded} 
      trackName="./sound/Z/Z10.mp3" 
    />
  )
}

export default SoundZ9;