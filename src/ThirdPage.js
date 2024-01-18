import './ThirdPage.css'

// eslint-disable-next-line react/prop-types
function ThirdPage({ onClose }) {
    const handleClick = () => {
        onClose()
    }

    return (
        <div className="container-third-page">
            <div className="content">
                <div className="staticLogo-container">
                    <img
                        src="/StaticLogo_screen.png"
                        alt="SAD"
                        className="statLogo"
                    />
                </div>
                <div className="welcomeText-container">
                    <p className="par1">
                        Добро пожаловать в эмбиент-сад — виртуальную версию
                        мемориального пространства на берегу Черейского озера,
                        посвященного деятелям беларуского независимого
                        искусства:
                    </p>
                    <p className="par2">
                        <span className="text-bold">
                            Леониду Нарушевичу, Артёму Залесскому и Алексею
                            Стрельникову.
                        </span>
                    </p>
                    <p className="par3">
                        Музыкальные догадки о зазеркалье, бесконечный эмбиент,
                        хрупкие мосты, по которым можно пройтись.
                    </p>
                </div>
                <div className="hp-logo-container">
                    <img
                        src="/headphone_icon.png"
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
                        src="/Sprava_logo.png"
                        alt="Sprava"
                        className="sprava-logo-static"
                    />
                </div>
            </div>
        </div>
    )
}

export default ThirdPage
