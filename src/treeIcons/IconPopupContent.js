import ArtobjN from "./artobj/ArtobjN";
import ArtobjS from "./artobj/ArtobjS";
import ArtobjZ from "./artobj/ArtobjZ";
import PersonN from "./person/PersonN";
import PersonS from "./person/PersonS";
import PersonZ from "./person/PersonZ";
import SoundN from "./sound/SoundN";
import SoundS from "./sound/SoundS";
import SoundZ from "./sound/SoundZ";
import "./IconPopupContent.css";

// eslint-disable-next-line react/prop-types
const IconPopupContent = ({iconPopupId}) => {
  return (
    <div className="icon-popup-content">
      {iconPopupId === "artobjN" && <ArtobjN />}
      {iconPopupId === "artobjS" && <ArtobjS />}
      {iconPopupId === "artobjZ" && <ArtobjZ />}
      {iconPopupId === "personN" && <PersonN />}
      {iconPopupId === "personS" && <PersonS />}
      {iconPopupId === "personZ" && <PersonZ />}
      {iconPopupId === "soundN" && <SoundN />}
      {iconPopupId === "soundS" && <SoundS />}
      {iconPopupId === "soundZ" && <SoundZ />}
    </div>
  )
}

export default IconPopupContent;