import { useNavigate } from 'react-router-dom';

import { ActivityButton } from "../components/ActivityButton"
import SearchBar from "../components/SearchBar"


import searchIcon from "../assets/icons/search-white.png"
import { useState } from 'react';

import productIcon from "../assets/icons/box-red-icon.png"
import cashierIcon from "../assets/icons/cashier-white-icon.png"

function Navbar() {

    
    return (
        <div className="navbar">
                <ActivityButton cls={"profile-icon"}>
                    <img src="https://img.icons8.com/ios-filled/40/user-male-circle.png" alt="user-male-circle"/>
                </ActivityButton> 
                <ActivityButton cls={"menu-btn"}>
                    <img src="https://img.icons8.com/ios-filled/40/menu-2.png" alt="menu-2"/>
                </ActivityButton>
            </div>
    )
}

function Hero({text, cls, placeholdstyle}) {

    const navigate = useNavigate()
    
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = (value) => {
        setSearchQuery(value)
    }
    const onKeydown = (e) => {
        if (e.key === 'Enter' && searchQuery !== "") {
            // Call your search function or trigger an action
            navigate("/inventory", {state: searchQuery})
        }
    }

    return (
        <div className="hero">
                <h2 className={cls}>{text}</h2>
                <div className="search-bar">
                            <div className="search-icon">
                                <img src={searchIcon} alt="search--v1"/>
                            </div>
                            <SearchBar placehold={"Cari Produk"} font={placeholdstyle} handlechange={handleSearch} onKey={onKeydown} initial={searchQuery}/>
                        </div>
            </div>
    )
}

function DisplayContainer() {
    return (
        <div className="display-container">
                <ActivityButton cls={"quick-access qa1"}>
                  
                </ActivityButton>
                <ActivityButton cls={"quick-access qa2"}>
                   
                </ActivityButton>
                <ActivityButton cls={"quick-access qa3"}>
                    
                </ActivityButton>
            </div>
    )
}

function MainActivity() {

    const navigate = useNavigate()

    return (
        <div className="main-activity">
                    <ActivityButton cls="main-activity-btn ac-inv" handleclick={() => navigate("/inventory")}>
                        <img src={productIcon} alt="" />
                        <p>Inventory</p>
                    </ActivityButton>
                    <ActivityButton cls="main-activity-btn ac-cas" handleclick={() => navigate("/report")}>
                        <img src={cashierIcon} alt="" />
                        <p>Report</p>
                    </ActivityButton>
                </div>
    )
}

export default function Home() {

    const fontPrimary = "montserrat-regular"
    const herotext = "Siap Pantau dan Kelola Produkmu, Tanpa Ribet."
    const heroStyle = fontPrimary + " font-black font-spacing"
    
    return (
        <div className="home">
            <Navbar />
            <Hero text={herotext} cls={heroStyle} placeholdstyle={fontPrimary}/>
            <DisplayContainer />
            <div className="activity-content">
                <MainActivity />
            </div>

        </div>
    )
}