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
          {/* <a
            target="_blank"
            rel="noreferrer"
          > */}
            <img src="/jpg/icon/music_link.png" />
          {/* </a> */}
        </div>
        <div className="person-container-n-music-link">
          <span className="music-lib-link-n">музыка</span>
        </div>
      </div>
    </div>
  )

}

export default PersonN;