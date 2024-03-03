import React, { useEffect } from 'react';
import StarterPage from './StarterPage';

import { createContext, useContext, useState } from 'react';
import BabylonScene from './BabylonScene';

const ButtonContext = createContext();

// eslint-disable-next-line react/prop-types
export const ButtonProvider = ({ children }) => {
    // Scene Component is shown
    const [isOpen, setIsOpen] = useState(false);
    // 3D objects are loaded
    const [isLoaded, setIsLoaded] = useState(false);
    // Progress of loading 3D objects
    const [progress, setProgress] = useState(0);

    // Click on Burger Menu
    const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);

    // Click on Icons on the Main Trees
    const [isIconPopupOpen, setIsIconPopupOpen] = useState(false);
    const [iconPopupId, setIconPopupId] = useState('');

    // Initial rotation, on the first loading
    const [isInitRotation, setIsInitRotation] = useState(true);

    // Autopilot mode
    const [isAutopilotOn, setIsAutopilotOn] = useState(false);


    const handleComponentOpen = (value) => {
        setIsOpen(value);
    }

    const contextValue = {
        isLoaded,
        isOpen,
        setIsLoaded,
        handleComponentOpen,
        progress,
        setProgress,

        isBurgerPopupOpen,
        setIsBurgerPopupOpen,

        isIconPopupOpen,
        setIsIconPopupOpen,
        iconPopupId,
        setIconPopupId,

        isAutopilotOn,
        setIsAutopilotOn,

        isInitRotation,
        setIsInitRotation,
    }

    return (
        <ButtonContext.Provider
            value={contextValue}
        >
            {children}
        </ButtonContext.Provider>
    )
}

export const useButtonContext = () => {
    const context = useContext(ButtonContext);
    if (!context) {
        throw new Error('useButtonContext must be used within a ButtonProvider');
    }
    return context;
}

export const App = () => {
    // need to use a small delay before starting loading a huge scene
    const [toStartLoadingScene, setToStartLoadingScene] = useState(false)

    useEffect(() => {
        const toStartLoadingSceneTimeout = setTimeout(() => {
            setToStartLoadingScene(true);
            // setToStartLoadingScene(false);
        }, 1000)

        // Cleanup function to clear timeouts on unmount
        return () => {
            clearTimeout(toStartLoadingSceneTimeout);
        }
    }, []);


    return (
        <ButtonProvider>
            <StarterPage />
            {toStartLoadingScene && <BabylonScene />}
        </ButtonProvider>
    )
}
