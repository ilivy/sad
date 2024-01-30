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
      <button className="close-icon" onClick={handleCloseBtnClick}>
        <img
          src="/jpg/icon/close_x.png"
          alt="Close"
        />
        <span id="close-pp">x</span>
      </button>
      <IconPopupContent iconPopupId={iconPopupId} />
    </div>,
    document.body
  );
}

export default IconPopup;
