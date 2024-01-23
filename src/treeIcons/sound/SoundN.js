import "./SoundN.css";

const SoundN = () => {
  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_3a.jpg"
          />
        </div>
        <div className="sound-title-text">
          <h2>Звук</h2>
          Автор:
          <br/>
          <a 
            href="https://www.facebook.com/3a.anton/"
            className="text-bold"
            target="_blank"
            rel="noreferrer"
          >
            Anton Anishchanka (Anton_3a)
          </a>
        </div>
      </div>
      <div className="sound-qoute-container">
        <hr className="sound-qoute-hr" />
        <p className="sound-qoute">
        “Основой моей части проекта стали записи гитарных партий Леонида
Нарушевича. Я посчитал важным использовать их как точку
отправления при переосмыслении его творчества. Не смотря на то,
что они стали порой неузнаваемыми внешне, я постарался
сохранить их внутренне.”
        </p>
        <br/>
        <p>
        Anton_3a — в своей музыке предпочитает использовать аналоговое
музыкальное оборудование и звуковые ландшафты, созданные во
время звуковых экспедиций по всему миру. В зависимости от проекта
работает в разных музыкальных жанрах - эмбиент-экспериментал,
кислотный фолк, эмбиент-джаз, дрон. Большинство его проектов
связаны с глубоким опытом прослушивания.
        </p>
      </div>
    </div>
  )
}

export default SoundN;