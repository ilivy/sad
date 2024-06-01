import { useButtonContext } from "../../App";

import "./PersonN.css";

const PersonN = () => {
  const { textLang } = useButtonContext();

  return (
    <div className="person-container-n">
      <div className="person-container-n-inner">
        <ul className="person-container-n-ul">
          { textLang == "en" && <>
              <li>composer</li>
              <li>guitarist</li>
              <li>improviser</li>
            </>}
            { textLang == "by" && <>
              <li>кампазітар</li>
              <li>гітарыст</li>
              <li>імправізатар</li>
            </>}
            { textLang == "ru" && <>
              <li>композитор</li>
              <li>гитарист</li>
              <li>импровизатор</li>
            </>}
        </ul>
        <h4>
            { textLang == "en" && <>Leonid Narushevich</>}
            { textLang == "by" && <>Леанід Нарушэвіч</>}
            { textLang == "ru" && <>Леонид Нарушевич</>}
        </h4>
        <div>
          <span className="text-bold">(1964 — 2019)</span>
        </div>
        <div className="person-container-n-img">
          <a
            href="https://archive.org/search?query=creator%3A%22Knyaz+Mishkin%22"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/jpg/icon/music_link.png" />
          </a>
        </div>
        <div className="person-container-n-music-link">
          <a
              href="https://archive.org/search?query=creator%3A%22Knyaz+Mishkin%22"
              target="_blank"
              rel="noreferrer"
              className="music-lib-link-n"
            >
            { textLang == "en" && <>music</>}
            { textLang == "by" && <>музыка</>}
            { textLang == "ru" && <>музыка</>}
          </a>
        </div>
      </div>
    </div>
  )

}

export default PersonN;