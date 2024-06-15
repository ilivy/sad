import { useButtonContext } from "../../App";

import "./ArtobjS.css";

// eslint-disable-next-line react/prop-types
const ArtobjS = () => {
  const { textLang } = useButtonContext();

  return (
    <div className="artobj-container">
      <div className="artobj-photo">
        <img 
          src="/jpg/photo/treePhoto_strelnikov.jpg"
        />
      </div>
      <div className="artobj-text">
        { textLang == "en" && <>
          <h2>Art object</h2>
          <p>
            Author:
            <br/>
            <span className="text-bold">
              <a
                href="https://www.instagram.com/bazinato/"
                target="_blank"
                rel="noreferrer"
                >
                Bazinato
              </a>
            </span>
            <br/>is an audiovisual artist, explorer and magician.
            <br/>Social activist.
            <br/>Working with practices of interaction and practices of perception.
            <br/>Exploring the world, its macro and micro structures, patterns and connections. He proposes to interact with the environment, space and time, applying in his experiments all available art practices and scientific knowledge.
          </p>
        </>}
        { textLang == "by" && <>
          <h2>Арт-аб&apos;ект</h2>
          <p>
            Аўтар:
            <br/>
            <span className="text-bold">
              <a
                href="https://www.instagram.com/bazinato/"
                target="_blank"
                rel="noreferrer"
                >
                Bazinato
              </a>
            </span>
            <br/>аўдыёвізуальны мастак, даследчык і чараўнік.
            <br/>Грамадскі актывіст.
            <br/>Працуе з практыкамі ўзаемадзеяння і практыкамі ўспрымання.
            <br/>Даследуючы свет, яго макра і мікра структуры, патэрны і сувязі. Ён прапануе ўзаемадзейнічаць з асяроддзем, прасторай і часам, ужываючы ў сваіх эксперыментах усе даступныя практыкі мастацтва і навуковыя веды.
          </p>
        </>}
        { textLang == "ru" && <>
          <h2>Арт-объект</h2>
          <p>
            Автор:
            <br/>
            <span className="text-bold">
              <a
                href="https://www.instagram.com/bazinato/"
                target="_blank"
                rel="noreferrer"
                >
                Bazinato
              </a>
            </span>
            <br/>Аудиовизуальный художник, исследователь и волшебник.
            <br/>Общественный активист.
            <br/>Работает с практиками взаимодействия и практиками восприятия.
            <br/>Исследуя мир, его макро и микро структуры, паттерны и связи, он предлагает взаимодействовать со средой, пространством и временем, применяя в своих экспериментах все доступные практики искусства и научные знания.
          </p>
        </>}
      </div>
    </div>
  )

}

export default ArtobjS;