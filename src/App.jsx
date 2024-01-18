import React, { useEffect } from 'react'
import StarterPage from './StarterPage'

import { createContext, useContext, useState } from 'react'
import BabylonScene from './BabylonScene'

const ButtonContext = createContext()

// eslint-disable-next-line react/prop-types
export const ButtonProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [progress, setProgress] = useState(0)


    const handleComponentOpen = (value) => {
        setIsOpen(value)
    }

    return (
        <ButtonContext.Provider
            value={{
                isLoaded,
                isOpen,
                setIsLoaded,
                handleComponentOpen,
                progress,
                setProgress,
            }}
        >
            {children}
        </ButtonContext.Provider>
    )
}

export const useButtonContext = () => {
    const context = useContext(ButtonContext)
    if (!context) {
        throw new Error('useButtonContext must be used within a ButtonProvider')
    }
    return context
}

export const App = () => {
    // need to use a small delay before starting loading a huge scene
    const [toStartLoadingScene, setToStartLoadingScene] = useState(false)

    useEffect(() => {
        const toStartLoadingSceneTimeout = setTimeout(() => {
            setToStartLoadingScene(true)
            // setToStartLoadingScene(false)
        }, 1000)

        // Cleanup function to clear timeouts on unmount
        return () => {
            clearTimeout(toStartLoadingSceneTimeout)
        }
    }, [])


    return (
        <ButtonProvider>
            <StarterPage />
            {toStartLoadingScene && <BabylonScene />}
        </ButtonProvider>
    )
}
