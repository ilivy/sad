import "./SoundZ.css";

const SoundZ = () => {
  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_skein.jpg"
          />
        </div>
        <div className="sound-title-text">
          <h2>Звук</h2>
          Автор:
          <br/>
          <a 
            href="https://www.facebook.com/SKEINsound/"
            className="text-bold"
            target="_blank"
            rel="noreferrer"
          >SK.EIN</a>
        </div>
      </div>
      <div className="sound-qoute-container">
        <hr className="sound-qoute-hr" />
        <p className="sound-qoute">
        “Наверное, результатом моего участия и стало то, чего мы с Артёмом
Залесским не успели сделать, хотя предполагали, что попробуем. Так
сказать my turn, основанный на его неудержимых барабанах. Будто
бы он прислал мне файлы со своими партиями и позволил сделать с
ними то, что я посчитаю нужным. И для «Sad Orchestra» я сделал то,
что в первую очередь хотел бы показать самому Артему, а затем
долго с ним спорить, проваливаясь в бездонную пропасть музыки.”
        </p>
        <br/>
        <p>
        SK.EIN — сольный проект Сергея Кравченко, перкуссиониста Port
Mone trio – саундтрипы на пересечении документального и
художественного, основанные на полевых записях и монотонных
грувах. Кросс-жанровая палитра в альбомах SK.EIN подчиняется
общей задумке и варьируется от эмбиента до пост-рока и даже
блэк-метала.
        </p>
      </div>
    </div>
  )
}

export default SoundZ;