import { useButtonContext } from "../../App";

import "./SoundZ.css";

const SoundZ = () => {
  const { textLang } = useButtonContext();

  return (
    <div className="sound-container">
      <div className="sound-title">
        <div className="sound-title-img">
          <img 
            src="/jpg/logo/logo_skein.jpg"
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
            href="https://www.facebook.com/SKEINsound/"
            className="text-bold"
            target="_blank"
            rel="noreferrer"
          >SK.EIN</a>
        </div>
      </div>
      <div className="sound-qoute-container">
        <hr className="sound-qoute-hr" />
        { textLang == "en" && <>
          <p className="sound-qoute">
            “Probably, the result of my participation is what Artem Zalessky and I didn&apos;t manage to do, although we thought we would try. So to speak, my turn, based on his unstoppable drums. It&apos;s as if he sent me files with his parts and let me do with them whatever I deemed necessary. For «Sad Orchestra», I did what I primarily wanted to show Artem himself, and then argue with him for a long time, falling into the bottomless abyss of music.”
          </p>
          <br/>
          <p>
            SK.EIN is a solo project by Sergey Kravchenko, percussionist of the Port Mone trio – soundtracks at the intersection of documentary and art, based on field recordings and monotonous grooves. The cross-genre palette in SK.EIN albums adheres to a general concept and ranges from ambient to post-rock and even black metal.
          </p>
        </>}
        { textLang == "by" && <>
          <p className="sound-qoute">
            “Напэўна, вынікам майго ўдзелу і стала тое, чаго мы з Арцёмам Залескім не паспелі зрабіць, хоць меркавалі, што паспрабуем. Так сказаць my turn, заснаваны на яго неўтаймоўных барабанах. Будта бы ён даслаў мне файлы са сваімі партыямі і дазволіў зрабіць з імі тое, што я палічу патрэбным. І для «Sad Orchestra» я зрабіў тое, што ў першую чаргу хацеў бы паказаць самому Арцёму, а затым доўга з ім спрачацца, правальваючыся ў бяздонную бездань музыкі.”
          </p>
          <br/>
          <p>
            SK.EIN — сольны праект Сяргея Краўчанкі, перкусіяніста Port Mone trio – саўндтрэкі на скрыжаванні дакументальнага і мастацкага, заснаваныя на палявых запісах і манатонных грувах. Крос-жанравая палітра ў альбомах SK.EIN падпарадкоўваецца агульнай задуме і вар&apos;іруецца ад эмбіенту да пост-року і нават блэк-металу.
          </p>
        </>}
        { textLang == "ru" && <>
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
        </>}
      </div>
    </div>
  )
}

export default SoundZ;