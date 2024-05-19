import ReactDOM from 'react-dom';
import { useState } from "react";
import { useButtonContext } from "../App";

import "./MainMenu.css";

const MainMenu = () => {
  const { setIsBurgerPopupOpen, setIsAutopilotOn, textLang } = useButtonContext();
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
    const sceneCanvas = document.getElementById("sad-canvas");
    if (sceneCanvas) { sceneCanvas.focus(); }
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
        <h4 onClick={() => handleClickItem("autopilot")}>
          {textLang == "en" && <>Autoconductor</>}
          {textLang == "by" && <>Аўтадырыжор</>}
          {textLang == "ru" && <>Автодирижер</>}
        </h4>
        {itemToShow === "autopilot" && <p className="text">
          {textLang == "en" && <>
            Autopilot mode:
            <br/>we move randomly through the forest and
            <br/>create an endless mix
          </>}
          {textLang == "by" && <>
            Рэжым аўтапілота:
            <br/>блукаем рандомна па лесе і
            <br/>ствараем бясконцы мікс
          </>}
          {textLang == "ru" && <>
            Режим автопилота:
            <br/>перемещаемся рандомно по лесу и
            <br/>создаем бесконечный микс
          </>}
          <br/>
          <button className="btn-pilot" onClick={() => handleClickBtnAutopilot(true)}>
            <img
              src="/jpg/btn/autopilot.png"
              alt="Autopilot"
            />
            <span id="autopilot-on">Autopilot</span>
          </button>
        </p>}
        <h4 onClick={() => handleClickItem("pilot")}>
          {textLang == "en" && <>Music score</>}
          {textLang == "by" && <>Партытура</>}
          {textLang == "ru" && <>Партитура</>}
        </h4>
        {itemToShow === "pilot" && <p className="text">
          {textLang == "en" && <>
            Move in any direction,
            <br/>touch things,
            <br/>listen to surroundings
          </>}
          {textLang == "by" && <>
            Рухайцеся ў якім хочаце кірунку,
            <br/>кратайце прадметы,
            <br/>прыслухоўвайцеся да наваколля
          </>}
          {textLang == "ru" && <>
            Двигайтесь в любом направлении,
            <br/>трогайте предметы,
            <br/>прислушайтесь к окружению 
          </>}
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
        {itemToShow !== "about" && 
          <a href="https://maps.app.goo.gl/Ww8gMUAGFa5xuDh39"
            target="_blank" 
            rel="noreferrer">
              <img
                src="/jpg/logo/static_small.gif"
                alt="SAD logo"
              />
          </a>
        }
        <h4 onClick={() => handleClickItem("about")} className="about">
          {textLang == "en" && <>About project</>}
          {textLang == "by" && <>Аб праекце</>}
          {textLang == "ru" && <>О проекте</>}
        </h4>
        {itemToShow === "about" && <p className="text">
          {textLang == "en" && <>
            <span className="text-bold">«Sad Orchestra»</span> (where «SAD» can be read as transliteration of the Belarusian word for «garden») — is an experimental project from <span className="text-bold">SPRAVA</span>, team, dedicated to three important figures of independent Belarusian art. To our departed contemporaries:
            <br/><span className="text-bold">Leonid Narushevich, Artyom Zalessky and Alexey Strelnikov.</span>
            <br/>
            <br/>We not only want to contribute to the preservation of their cultural heritage,but also to reimagine it, offering instead of a static memorial a living, capricious space — the garden one can enter to remember.
            <br/>The memory that you can enter like a garden where everything gathers into a new experience.
            <br/>The past — already said and heard.
            <br/>The present — living in every action.
            <br/>The future — unknown, but ready to manifest itself.
            <br/>
            <br/><span className="text-bold">Lenya, Artyom</span> and <span className="text-bold">Lesha</span> were experimenters, visionaries and the coolest actors in the independent Belarusian scene.
            <br/>By creating the SAD Orchestra, we are paving invisible symbolic connections between our heroes and us, between the past and the future — both ours and of alternative culture.
            <br/>
            <br/>You too may find yourself at the point of intersection, traveling through the virtual forest on the peninsula in Lake Chareyskae, and discovering among the trees the ones that sound with the voices of our heroes. Become a mediator between the past and the future, fly into the light, follow the sound, don’t be shy about experimenting and don’t be afraid to interact.
          </>}
          {textLang == "by" && <>
            <span className="text-bold">«Sad Orchestra»</span> (Аркестр Сад) — эксперыментальны праект ад каманды <span className="text-bold">SPRAVA</span>, прысвечаны тром важным асобам незалежнага беларускага мастацтва. Сучаснікам, якія заўчасна пакінулі нас:
            <br/><span className="text-bold">Леаніду Нарушэвічу, Арцёму Залескаму і Аляксею Стрэльнікаву.</span>
            <br/>
            <br/>Мы не толькі хочам зрабіць свой унёсак у захаванне іх культурнай спадчыны, але і пераасэнсаваць яе, прапануючы замест статычнага мемарыялу жывую, наравістую прастору — сад, у які можна ўвайсці, каб успомніць.
            <br/>Памяць, у якую можна ўвайсці, як у сад, дзе ўсё збіраецца ў новы досвед.
            <br/>Мінулае — ужо сказанае і прагучалае.
            <br/>Сучаснасць — жыве ў кожным дзеянні.
            <br/>Будучыня — невядомая, але гатовая праявіцца.
            <br/>
            <br/><span className="text-bold">Леанід, Арцём</span> і <span className="text-bold">Аляксей</span> былі эксперыментатарамі, візіянерамі і суперфайнымі актарамі незалежнай беларускай сцэны.
            <br/>Ствараючы Аркестр Сад, мы пракладаем нябачныя, сімвалічныя повязі паміж нашымі героямі і намі, паміж мінулым і будучыняй — і нашымі, і альтэрнатыўнай культуры.
            <br/>
            <br/>У пункце перасячэння можаце апынуцца і вы, вандруючы па віртуальным лесе на паўвостраве Чарэйскага возера і знайшоўшы сярод дрэваў тыя, што гучаць галасамі нашых герояў. Станавіцеся пасярэднікам паміж мінуўшчынай і будучыняй, ляціце на святло, ідзіце на гук, не саромейцеся эксперыментаваць і не бойцеся ўзаемадзейнічаць.
          </>}
          {textLang == "ru" && <>
            <span className="text-bold">«Sad Orchestra»</span> (Оркестр Сад) — экспериментальный проект от команды <span className="text-bold">SPRAVA</span>, посвященный трем важным фигурам независимого беларуского искусства. Нашим ушедшим современникам:
            <br/><span className="text-bold">Леониду Нарушевичу, Артёму Залесскому и Алексею Стрельникову.</span>
            <br/>
            <br/>Мы не только хотим внести свой вклад в сохранение их культурного наследия, но и переосмыслить его, предлагая вместо статичного мемориала живое, своенравное пространство — сад, в который можно войти, чтобы вспомнить.
            <br/>Память, в которую можно войти, как в сад, где всё собирается в новый опыт.
            <br/>Прошлое — уже сказанное и прозвучавшее.
            <br/>Настоящее — живущее в каждом действии.
            <br/>Будущее — неизвестное, но готовое проявиться.
            <br/>
            <br/><span className="text-bold">Леня, Артем</span> и <span className="text-bold">Леша</span> были экспериментаторами, визионерами и крутейшими акторами независимой беларуской сцены.
            <br/>Создавая Оркестр Сад, мы прокладываем невидимые, символические связи между нашими героями и нами, между прошлым и будущим — и нашим, и альтернативной культуры.
            <br/>
            <br/>В точке пересечений можете оказаться и вы, путешествуя по виртуальному лесу на полуострове Черейского озера и отыскав среди деревьев те, что звучат голосами наших героев. Становитесь посредником между прошлым и будущим, летите на свет, идите на звук, не стесняйтесь эксперимента и не бойтесь взаимодействовать.
          </>}
        </p>}
      </div>
    </div>,
    document.body
  );
}

export default MainMenu;
