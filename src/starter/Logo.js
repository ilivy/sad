import React from 'react'
import './Logo.css'

export const Logo = () => {
    return (
        <div className="logo-container">
            <a href="https://www.google.com/maps/place/54%C2%B038'30.0%22N+29%C2%B018'29.6%22E"
               target="_blank" 
               rel="noreferrer">
                <img src="/jpg/logo/static_small.gif" alt="SAD Logo" className="logo-gif" />
            </a>
        </div>
    )
}
