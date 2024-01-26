import ReactDOM from 'react-dom';
import { useButtonContext } from "../App";
import IconPopupContent from "./IconPopupContent";
import "./IconPopup.css";

const IconPopup = () => {
  const { setIsIconPopupOpen, iconPopupId } = useButtonContext();
    
  const handleCloseBtnClick = () => {
    setIsIconPopupOpen(false);
  };

  return ReactDOM.createPortal(
    <div className="icon-popup-container">
      <img
        src="/jpg/icon/close_x.png"
        alt="Close"
        className="close-icon"
        onClick={handleCloseBtnClick}
      />
      <IconPopupContent iconPopupId={iconPopupId} />
    </div>,
    document.body
  );
}

export default IconPopup;
