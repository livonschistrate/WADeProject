import React, { useState } from "react";
import "./login.css";
import "./mainpage.css"

export default function MainPage(){
    const [isLogin, setIsLogin] = useState(true);

    return(
    <div>
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
            <a href="/">Log-out</a>
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