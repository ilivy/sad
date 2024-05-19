import React from "react";

import { useButtonContext } from "../App";

import "./MemoryText.css";

export const MemoryText = () => {
    const { textLang } = useButtonContext();

    return (
        <div className="text-container">
            { textLang == "en" && <>
                <p className="line1"><span className="text-bold">Memory</span> — is not only <span className="text-bold">recollection</span> of the past,</p>
                <p className="line2">but also its <span className="text-bold">comprehension</span> for the sake of the future.</p>
            </>}
            { textLang == "by" && <>
                <p className="line1"><span className="text-bold">Памяць</span> — гэта не толькі <span className="text-bold">ўспаміны</span> пра мінулае,</p>
                <p className="line2">але і  <span className="text-bold">асэнсаванне</span> яго дзеля будучыні.</p>
            </>}
            { textLang == "ru" && <>
                <p className="line1"><span className="text-bold">Память</span> — это не только <span className="text-bold">воспоминания</span> о прошлом,</p>
                <p className="line2">но и его <span className="text-bold">осмысление</span> ради будущего.</p>
            </>}
        </div>
    )
}
