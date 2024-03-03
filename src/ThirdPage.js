import React, { useEffect } from 'react';
import { useButtonContext } from './App';
import InitialRotation from "./sidebar/InitialRotation";
import './ThirdPage.css';

// eslint-disable-next-line react/prop-types
function ThirdPage({ onClose }) {
    const { setIsInitRotation } = useButtonContext();

    const handleClick = () => {
        onClose();
        setIsInitRotation(false);
    }
    
    useEffect(() => {
        if (document.getElementById("babylonUnmuteIconBtn")) {
            document.getElementById("babylonUnmuteIconBtn").style.top = "20px";
        }
    }, [])

    return (
        <>
            <InitialRotation />
            <div className="container-third-page">
                <div className="content">
                    <div className="logo-container">
                        <a href="https://maps.app.goo.gl/Ww8gMUAGFa5xuDh39"
                        target="_blank" 
                        rel="noreferrer">
                        <img
                            src="/jpg/logo/static_small.gif"
                            alt="SAD"
                            className="stat-logo"
                        /></a>
                    </div>
                    <div className="welcomeText-container">
                        <p className="par1">Добро пожаловать в эмбиент-сад — виртуальную версию</p>
                        <p className="par2">мемориального пространства на берегу Черейского озера,</p>
                        <p className="par3">посвященного деятелям беларуского независимого искусства:</p>
                        <p className="par4"><span className="text-bold">Леониду Нарушевичу, Артёму Залесскому и</span></p>
                        <p className="par5"><span className="text-bold">Алексею Стрельникову.</span></p>
                        <p className="par6">Музыкальные догадки о зазеркалье, бесконечный эмбиент,</p>
                        <p className="par7">хрупкие мосты, по которым можно пройтись.</p>
                    </div>
                    <div className="hp-logo-container">
                        <img
                            src="/jpg/icon/headphones.png"
                            alt="headphones"
                            className="hp-logo"
                        />
                    </div>
                    <div className="hptext-container">
                        используйте наушники для лучшего впечатления
                    </div>
                    <button className="button" onClick={handleClick}></button>
                    <div className="sprava-logo-text">проект фестиваля</div>
                    <div className="sprava-logo-container">
                        <img
                            src="/jpg/logo/sprava.png"
                            alt="Sprava"
                            className="sprava-logo-static"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThirdPage
