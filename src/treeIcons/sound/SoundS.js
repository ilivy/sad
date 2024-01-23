import "./SoundS.css";

const SoundS = () => {
  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_void.jpg"
          />
        </div>
        <div className="sound-title-text">
          <h2>Звук</h2>
          Автор:
          <br/>
          <a 
            href="https://soundcloud.com/saburovm"
            className="text-bold"
            target="_blank"
            rel="noreferrer"
          >v.o.id</a>
        </div>
      </div>
      <div className="sound-qoute-container">
        <hr className="sound-qoute-hr" />
        <p className="sound-qoute">
        “Продолжать разговаривать. Работа над музыкой была наполнена кайфовыми взаимодействиями с живыми и с живущими в звуках друзьями.”
        </p>
        <br/>
        <p>
        Электро-акустический проект музыканта и композитора Матвея Сабурова.
        </p>
      </div>
    </div>
  )
}

export default SoundS;