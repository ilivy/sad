import { useButtonContext } from "../../App";

import "./SoundS.css";

const SoundS = () => {
  const { textLang } = useButtonContext();

  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_void.jpg"
          />
        </div>
        <div className="sound-title-text">
          { textLang == "en" && <>
            <h2>Sound</h2>
            Author:</>
          }
          { textLang == "by" && <>
            <h2> Гук</h2>
            Аўтар:</>
          }
          { textLang == "ru" && <>
            <h2>Звук</h2>
            Автор:</>
          }
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
        { textLang == "en" && <>
          <p className="sound-qoute">
            “Continue to talk. Work on music was filled with cool interactions with friends nearby and friends living in sounds.”
          </p>
          <br/>
          <p>
            The electrical-acoustic project of the musician and composer Matvei Saburov.
          </p>
        </>}
        { textLang == "by" && <>
          <p className="sound-qoute">
            “Працягваць размаўляць. Праца над музыкай была напоўнена кайфовымі ўзаемадзеяннямі з сябрамі. Сябрамі што побач, сябрамі, што застаюцца побач у гуках.”
          </p>
          <br/>
          <p>
          Электра-акустычны праект музыкі і кампазітара Мацея Сабурава.
          </p>
        </>}
        { textLang == "ru" && <>
          <p className="sound-qoute">
            “Продолжать разговаривать. Работа над музыкой была наполнена кайфовыми взаимодействиями с живыми и с живущими в звуках друзьями.”
          </p>
          <br/>
          <p>
            Электро-акустический проект музыканта и композитора Матвея Сабурова.
          </p>
        </>}
      </div>
    </div>
  )
}

export default SoundS;