import { useButtonContext } from "../../App";

import "./PersonS.css";

const PersonZ = () => {
  const { textLang } = useButtonContext();
  
  return (
    <div className="person-container-s">
      <div className="person-container-s-inner">
        <h4>
            { textLang == "en" && <>Alexey Strelnikov</>}
            { textLang == "by" && <>Аляксей Стрэльнікаў</>}
            { textLang == "ru" && <>Алексей Стрельников</>}
        </h4>
        <div>
          <span className="text-bold">(1983 — 2022)</span>
        </div>
        <ul className="person-container-s-ul">
          { textLang == "en" && <>
            <li>theater critic</li>
            <li>director</li>
            <li>experimenter</li>
          </>}
          { textLang == "by" && <>
            <li>тэатральны крытык</li>
            <li>рэжысёр</li>
            <li>эксперыментатар</li>
          </>}
          { textLang == "ru" && <>
            <li>театральный критик</li>
            <li>режиссёр</li>
            <li>экспериментатор</li>
          </>}
        </ul>
        <div className="person-container-s-img">
          <a
            href="https://free-teatr-aleks-strel.net/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/jpg/icon/site_link.png" />
          </a>
        </div>
        <div className="person-container-s-music-link">
          <a 
            href="https://free-teatr-aleks-strel.net/"
            target="_blank"
            rel="noreferrer"
            className="music-lib-link-s">
              { textLang == "en" && <>website</>}
              { textLang == "by" && <>сайт</>}
              { textLang == "ru" && <>сайт</>}
            </a>
        </div>
      </div>
    </div>
  )

}

export default PersonZ;