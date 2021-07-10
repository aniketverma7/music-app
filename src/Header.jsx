import React from 'react'
import "./header.css"
import Logo from "./logo3.gif"
const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={Logo} alt="logo"/>
                
                <h4>Music</h4>
            </div>
            
        </div>
    )
}

export default Header
