import "./DiscographyPopup.css";

// eslint-disable-next-line react/prop-types
const DiscographyPopup = ({onPopupclose}) => {
  return (
    <div className="discography-popup-container">
      <img
        src="/jpg/icon/close_x.png"
        alt="Close"
        className="close-icon"
        onClick={onPopupclose}
      />
      
    </div>
  )
}

export default DiscographyPopup;