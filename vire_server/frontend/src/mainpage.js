import React from "react";
//import "./login.css";
//import "./mainpage.css"
import { useNavigate } from "react-router-dom";


export default function MainPage(){

    return(
    <div className="mainpage-wrapper">
        <MainPageHeader/>
        <section class="info-container">
        <h2>Welcome to Your Website</h2>
        <p>This is the home page content. You can replace this with the content specific to your home page.</p>
        </section>
        <MainPageFooter/>
    </div>
    );
}

export function MainPageHeader(){
    const navigate = useNavigate();

    const handleLogout = () => {
        setCookie("vireLoggedIn", false, 1);
        navigate("/");
      };    

      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }    

    return(
    <div>
        <header>
        <h3>ViRE - Vinyl Recommender</h3>
        </header>
        
        <nav>
        <a href="/">Home</a>
        <a href="/recommendations">Recommendations</a>
        <a href="/playlists">Playlists</a>
        <a class="account-button"><i class="fa fa-user"></i></a>
        <div class="account-links">
            <a href="/settings">Settings</a>
            <a onClick={handleLogout} href="/">Logout</a>
        </div>
        </nav>
    </div>
    );
}

export function MainPageFooter(){
    return(
        <div>
            <footer>
            <p>&copy; 2024 Web.fm @ WADe. All rights reserved.</p>
            </footer>
        </div>
    );
}