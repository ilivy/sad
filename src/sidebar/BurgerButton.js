import { useButtonContext } from "../App";
import "./BurgerButton.css";


const BurgerButton = () => {
  const { setIsBurgerPopupOpen } = useButtonContext();

  const handleBurgerBtnClick = () => {
    setIsBurgerPopupOpen(true);
  }

  return (
    <div className="burger-icon-container">
      <img
        src="/jpg/icon/burger.png"
        alt="Main Menu"
        className="burger-icon"
        onClick={handleBurgerBtnClick}
      />
    </div>
  )
}

export default BurgerButton;