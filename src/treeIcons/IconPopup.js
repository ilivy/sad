import { useButtonContext } from "../App";
import IconPopupContent from "./IconPopupContent";
import "./IconPopup.css";

const IconPopup = () => {
  const { setIsIconPopupOpen, iconPopupId } = useButtonContext();
    
  const handleCloseBtnClick = () => {
    setIsIconPopupOpen(false);
  };

  return (
    <div className="icon-popup-container">
      <img
        src="/jpg/icon/close_x.png"
        alt="Close"
        className="close-icon"
        onClick={handleCloseBtnClick}
      />
      <IconPopupContent iconPopupId={iconPopupId} />
    </div>
    );
}

export default IconPopup;
