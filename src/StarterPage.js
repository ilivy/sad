import React, { useEffect, useState } from 'react'
import { Logo } from './starter/Logo'
import { Loader } from './starter/Loader'
import { MemoryText } from './starter/MemoryText'
import { Languages } from './starter/Languages'
import { useButtonContext } from './App'
// import SecondPage from './SecondPage'
import './StarterPage.css'

const StarterPage = () => {
    const [showMemoryText, setShowMemoryText] = useState(false)
    const [showLanguages, setShowLanguages] = useState(false)
    const [showSecondPage, setShowSecondPage] = useState(false)
    const { isLoaded, isOpen, handleComponentOpen } = useButtonContext()

    useEffect(() => {
        const delay = 4000 // milliseconds

        const memoryTextTimeout = setTimeout(() => {
            setShowMemoryText(true)
        }, delay * 3)

        const languagesTimeout = setTimeout(() => {
        //   setShowLanguages(true)
          setShowLanguages(false)
        }, delay * 4)

        // Cleanup function to clear timeouts on unmount
        return () => {
            clearTimeout(memoryTextTimeout)
            clearTimeout(languagesTimeout)
        }
    }, [])

    useEffect(() => {
        if (isLoaded) {
            setShowSecondPage(true)
        }
    }, [isLoaded])

    useEffect(() => {
        if (isLoaded) {
            const openComponentTimeout = setTimeout(() => {
                handleComponentOpen(true)
            }, 1000)

            return () => {
                clearTimeout(openComponentTimeout)
            }
        }
    }, [handleComponentOpen, isLoaded])

    useEffect(() => {
        if (isLoaded && showSecondPage) {
            const thirdPageTimeout = setTimeout(() => {
                setShowSecondPage(false)
            }, 20000) // 20000

            return () => {
                clearTimeout(thirdPageTimeout)
            }
        }
    }, [handleComponentOpen, isLoaded, showSecondPage])

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
        return <></>
        // return showSecondPage && <SecondPage />
    }

    return (
        !isOpen && (
            <>
                {!isLoaded && !showSecondPage && renderFirstPage()}
                {isLoaded && showSecondPage && renderSecondPage()}
            </>
        )
    )
}

export default StarterPage
