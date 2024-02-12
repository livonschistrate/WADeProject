import React, { useState } from "react";
import "./login.css";
import "./mainpage.css"
import { MainPageHeader, MainPageFooter } from "./mainpage";

export default function PlaylistsPage(){
    // const [searchText, setSearchText] = useState("");

    return(
    <div>
        <MainPageHeader/>
        <section class="info-container">
            <h2>Saved playlists</h2>

        </section>
        <MainPageFooter/>
    </div>
    );
}