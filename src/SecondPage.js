import { useButtonContext } from "./App";

import "./SecondPage.css";

const SecondPage = () => {
    const { textLang } = useButtonContext();

    return (
        <div className="second-page">
            <p>
                { textLang == "en" && <>Lend an ear to it</>}
                { textLang == "by" && <>Прыслухайцеся да яе</>}
                { textLang == "ru" && <>Прислушайтесь к ней</>}
                <img src="/jpg/gif/loading.gif" />
            </p>
        </div>
    )
}

export default SecondPage
