import React, { useEffect, useState } from 'react';
import { Logo } from './starter/Logo';
import { Loader } from './starter/Loader';
import { MemoryText } from './starter/MemoryText';
import { Languages } from './starter/Languages';
import { useButtonContext } from './App';
import SecondPage from './SecondPage';
import './StarterPage.css';

const StarterPage = () => {
    const [showMemoryText, setShowMemoryText] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showSecondPage, setShowSecondPage] = useState(false);
    const { isLoaded, isOpen, handleComponentOpen } = useButtonContext();


    useEffect(() => {
        const delay = 4000; // milliseconds

        setShowMemoryText(true);

        const languagesTimeout = setTimeout(() => {
            setShowLanguages(true);
        }, delay * 1);

        // Cleanup function to clear timeouts on unmount
        return () => {
            clearTimeout(languagesTimeout);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            
            const openSecondPageTimeout = setTimeout(() => {
                setShowSecondPage(true);
            }, 2000);

            const openComponentTimeout = setTimeout(() => {
                handleComponentOpen(true);  // = setIsOpen(true) - Second page is closed
            }, 20000);  // 10000

            return () => {
                clearTimeout(openSecondPageTimeout);
                clearTimeout(openComponentTimeout);
            }
        }
    }, [isLoaded, handleComponentOpen]);

    function renderFirstPage() {
        return (
            <div className="first-page-container">
                {<Logo />}
                {<Loader />}
                {showMemoryText && <MemoryText />}
                {showLanguages && <Languages />}
            </div>
        )
    }

    function renderSecondPage() {
        // return <></>
        return showSecondPage && <SecondPage />
    }

    return (
        !isOpen && (
            <>
                { !showSecondPage && renderFirstPage() }
                { showSecondPage && renderSecondPage() }
            </>
        )
    )
}

export default StarterPage
