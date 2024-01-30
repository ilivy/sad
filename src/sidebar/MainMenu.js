import ReactDOM from 'react-dom';
import { useState } from "react";
import { useButtonContext } from "../App";
import "./MainMenu.css";

const MainMenu = () => {
  const { setIsBurgerPopupOpen, setIsAutopilotOn } = useButtonContext();
  const [ itemToShow, setItemToShow ] = useState('');

  const handleCloseBtnClick = () => {
    setIsBurgerPopupOpen(false);
  };

  const handleClickItem = (itemName) => {
    if (itemToShow === itemName) {
      setItemToShow("");
    } else {
      setItemToShow(itemName);
    }
  };

  const handleClickBtnAutopilot = (isOn) => {
    setIsBurgerPopupOpen(false);
    setIsAutopilotOn(isOn);
  };

  return ReactDOM.createPortal(
    <div className="main-menu-container">
      <div className="top-box">
        <button className="close-icon" onClick={handleCloseBtnClick}>
          <img
            src="/jpg/icon/close_x.png"
            alt="Close"
          />
          <span id="close-mm">x</span>
        </button>
        <h4 onClick={() => handleClickItem("autopilot")}>Ты слушаешь</h4>
        {itemToShow === "autopilot" && <p className="text">
          Режим автопилота:
          <br/>перемещаемся рандомно по лесу и
          <br/>слушаем бесконечный микс
          <br/>
          <button className="btn-pilot" onClick={() => handleClickBtnAutopilot(true)}>
            <img
              src="/jpg/btn/autopilot.png"
              alt="Autopilot"
            />
            <span id="autopilot-on">Autopilot</span>
          </button>
        </p>}
        <h4 onClick={() => handleClickItem("pilot")}>Ты играешь</h4>
        {itemToShow === "pilot" && <p className="text">
          Двигаемся в любом направлении,
          <br/>трогаем предметы,
          <br/>взаимодействуем с окружением
          <br/>
          <button className="btn-pilot" onClick={() => handleClickBtnAutopilot(false)}>
            <img
              src="/jpg/btn/pilot.png"
              alt="Pilot"
            />
            <span id="autopilot-off">Pilot</span>
          </button>
        </p>}
      </div>
      <div className="bottom-box">
        {itemToShow !== "about" && <img
          src="/jpg/logo/static_small.png"
          alt="SAD logo"
        />}
        <h4 onClick={() => handleClickItem("about")} className="about">О проекте</h4>
        {itemToShow === "about" && <p className="text">
          <span className="text-bold">«Sad Orchestra»</span> (Оркестр Сад) — экспериментальный проект от команды <span className="text-bold">SPRAVA</span>, посвященный трем важным фигурам независимого беларуского искусства. Нашим ушедшим современникам:
          <br/><span className="text-bold">Леониду Нарушевичу, Артёму Залесскому и Алексею Стрельникову.</span>
          <br/>
          <br/>Мы не только хотим внести свой вклад в сохранение их культурного наследия, но и переосмыслить его, предлагая вместо статичного мемориала живое, своенравное пространство — сад, в который можно войти, чтобы вспомнить.
          <br/>Память, в которую можно войти, как в сад, где всё собирается в новый опыт.
          <br/>Прошлое — уже сказанное и прозвучавшее.
          <br/>Настоящее — живущее в каждом действии.
          <br/>Будущее — неизвестное, но готовое проявиться.
          <br/>
          <br/><span className="text-bold">Леня, Артем</span> и <span className="text-bold">Леша</span> были экспериментаторами, визионерами и крутейшими акторами независимой беларусской сцены.
          <br/>Создавая Оркестр Сад, мы прокладываем невидимые, символические связи между нашими героями и нами, между прошлым и будущим — и нашим, и альтернативной культуры.
          <br/>
          <br/>В точке пересечений можете оказаться и вы, путешествуя по виртуальному лесу на полуострове Черейского озера и отыскав среди деревьев те, что звучат голосами наших героев. Становитесь посредником между прошлым и будущим, летите на свет, идите на звук, не стесняйтесь эксперимента и не бойтесь взаимодействовать.
        </p>}
      </div>
    </div>,
    document.body
  );
}

export default MainMenu;
