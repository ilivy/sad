// import { useState } from "react";
// import DiscographyPopup from "./DiscographyPopup";
import "./PersonZ.css";

const PersonZ = () => {
  // const [isDiscographyOpen, setIsDiscographyOpen] = useState(false);

  const handlePopupOpen = () => {
    const discographyPageUrl = "/info/discography_zalesskij.html"
    window.open(discographyPageUrl, '_blank')
    // setIsDiscographyOpen(true);
  }

  // const handlePopupClose = () => {
  //   setIsDiscographyOpen(false);
  // }

  return (
    <div className="person-container">
      <div className="person-container-inner">
        <ul className="person-container-ul">
          <li>музыкант</li>
          <li>барабанщик</li>
          <li>авангардист</li>
        </ul>
        <h4>Артём Залесский</h4>
        <div>
          <span className="text-bold">(1977 — 2022)</span>
        </div>
        <div className="person-container-img">
          <img src="/jpg/icon/music_link.png" onClick={handlePopupOpen} />
        </div>
        <div className="person-container-music-link">
          <span className="music-lib-link" onClick={handlePopupOpen}>дискография</span>
        </div>
      </div>
      {/* {isDiscographyOpen && <DiscographyPopup onPopupclose={handlePopupClose} />} */}
    </div>
  )

}

export default PersonZ;