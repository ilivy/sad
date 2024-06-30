import { useButtonContext } from "../../App";

import "./SoundN.css";

const SoundN = () => {
  const { textLang } = useButtonContext();

  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_3a.jpg"
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
            href="https://www.facebook.com/3a.anton/"
            className="text-bold"
            target="_blank"
            rel="noreferrer"
          >
            Anton Anishchanka
          </a>
        </div>
      </div>
      <div className="sound-qoute-container">
        <hr className="sound-qoute-hr" />
        { textLang == "en" && <>
          <p>
            Field recordist, sound artist, music composer. Works in the field of electronic music production and electroacoustic music composition. He prefers to use analogue musical gear and soundscapes made during sound expeditions around the world. He creates music in different musical genres – ambient experimental, ethno-ambient, ambient jazz, drone. Most of his projects are about deep listening experience.
          </p>
        </>}
        { textLang == "by" && <>
          <p className="sound-qoute">
            “Основой моей части проекта стали записи гитарных партий Леонида Нарушевича. Я посчитал важным использовать их как точку отправления при переосмыслении его творчества. Несмотря на то, что они стали порой неузнаваемыми внешне, я постарался сохранить их внутренне.”
          </p>
          <br/>
          <p>
            Филд рекордист, музыкант и композитор электроакустической музыки. В своей музыке предпочитает использовать аналоговое музыкальное оборудование и полевые записи звука, записанные во время звуковых экспедиций в разных регионах. В зависимости от проекта работает в разных музыкальных жанрах - этно-эмбиент, экспериментальный фолк, эмбиент-джаз, дрон. В основе его проектов лежит практика осознанного прослушивания...
          </p>
        </>}
        { textLang == "ru" && <>
          <p className="sound-qoute">
            “Основой моей части проекта стали записи гитарных партий Леонида Нарушевича. Я посчитал важным использовать их как точку отправления при переосмыслении его творчества. Несмотря на то, что они стали порой неузнаваемыми внешне, я постарался сохранить их внутренне.”
          </p>
          <br/>
          <p>
            Филд рекордист, музыкант и композитор электроакустической музыки. В своей музыке предпочитает использовать аналоговое музыкальное оборудование и полевые записи звука, записанные во время звуковых экспедиций в разных регионах. В зависимости от проекта работает в разных музыкальных жанрах - этно-эмбиент, экспериментальный фолк, эмбиент-джаз, дрон. В основе его проектов лежит практика осознанного прослушивания...
          </p>
        </>}
      </div>
    </div>
  )
}

export default SoundN;