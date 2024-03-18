import "./PersonN.css";

const PersonN = () => {
  return (
    <div className="person-container-n">
      <div className="person-container-n-inner">
        <ul className="person-container-n-ul">
          <li>композитор</li>
          <li>гитарист</li>
          <li>импровизатор</li>
        </ul>
        <h4>Леонид Нарушевич</h4>
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
            музыка
          </a>
        </div>
      </div>
    </div>
  )

}

export default PersonN;