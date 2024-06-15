import React from "react";

import { useButtonContext } from "../App";

import "./Languages.css";


export const Languages = () => {
    const { setTextLang, textLang } = useButtonContext();

    const handleClickLang = (lang) => {
        setTextLang(lang);
      };    

    return (
        <div className="lang-container">
            {textLang !== "en" && 
                <img onClick={() => handleClickLang("en")} src="/jpg/btn/ENG_icon.png" alt="eng-icon" className="eng-logo-icon" />
            }
            {textLang !== "by" && 
                <img onClick={() => handleClickLang("by")} src="/jpg/btn/BY_icon.png" alt="eng-icon" className="by-logo-icon" />
            }
            {textLang !== "ru" && 
                <img onClick={() => handleClickLang("ru")} src="/jpg/btn/RUS_icon.png" alt="eng-icon" className="rus-logo-icon" />
            }
        </div>
    )
}
