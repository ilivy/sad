import "./PersonS.css";

const PersonZ = () => {
  return (
    <div className="person-container-s">
      <div className="person-container-s-inner">
        <h4>Алексей Стрельников</h4>
        <div>
          <span className="text-bold">(1983 — 2022)</span>
        </div>
        <ul className="person-container-s-ul">
          <li>театральный критик</li>
          <li>режиссёр</li>
          <li>экспериментатор</li>
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
            сайт</a>
        </div>
      </div>
    </div>
  )

}

export default PersonZ;