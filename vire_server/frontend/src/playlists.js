import React, { useState } from "react";
import "./login.css";
import "./mainpage.css"
import { MainPageHeader, MainPageFooter } from "./mainpage";

export default function PlaylistsPage(){
    // const [searchText, setSearchText] = useState("");

    return(
    <div>
        <MainPageHeader/>
        <section className="info-container">
            <h2>Saved playlists</h2>
            <div class="pref-button-group">
                <button className="i-like" >Add a playlist</button>
            </div>
        </section>
        <MainPageFooter/>
    </div>
    );
}