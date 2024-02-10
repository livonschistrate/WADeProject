"use client";

import React, { useState } from "react";
import "./login.css";
import "./mainpage.css"
import { MainPageHeader, MainPageFooter } from "./mainpage";

export default function RecommendationPage(){
    const [searchText, setSearchText] = useState("");

    return(
    <div>
        <MainPageHeader/>
        <section class="info-container">
            <h2>Recommendations</h2>
            <div class="form-group">
            <label for="search">Search for songs, playlists:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>
    );
}
