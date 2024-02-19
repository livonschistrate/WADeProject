import React, { useState } from "react";
import "./login.css";
import "./mainpage.css"
import { MainPageHeader, MainPageFooter } from "./mainpage";

export default function SettingsPage(){
    const [username, setNewUsername] = useState("");
    const loggedInUser = JSON.parse(localStorage.getItem('user_details'));

    return(
    <div>
        <MainPageHeader/>
        <section class="info-container">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" value={loggedInUser[0]['fields']['username']} required/>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" value={loggedInUser[0]['fields']['email']} required disabled/>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" value={loggedInUser[0]['fields']['password']} required disabled/>
        </div>
        <LinkDiscogs/>
        <LinkLastFM/>
        </section>
        <MainPageFooter/>
    </div>
    );
}

export function LinkDiscogs(){
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const authorizationUrl = `https://www.discogs.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read write`;
    const loggedInUser = JSON.parse(localStorage.getItem('user_details'));

    const handleAuthURL = () => {
        window.location.href = authorizationUrl;
      };
    
    if(loggedInUser[0]['fields']['discogs_linked'] === null || loggedInUser[0]['fields']['discogs_linked'] === false)
    {   return(
        <div class="form-group">
            <a class="link-button discogs-link" onClick={handleAuthURL}>
            Disconnect Discogs Account
            </a>
        </div>
    )}
    else
    {   return(
        <div class="form-group">
            <a class="link-button discogs-link" onClick={handleAuthURL}>
            Link Discogs Account
            </a>
        </div>
    )}
}

export function LinkLastFM(){
    const apiKey = 'YOUR_CLIENT_ID';
    const callbackUrl = 'http://localhost:3000';
    const authorizationUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
    const loggedInUser = JSON.parse(localStorage.getItem('user_details'));

    const handleAuthURL = () => {
        window.location.href = authorizationUrl;
      };
    
    if(loggedInUser[0]['fields']['lastfm_linked'] === null || loggedInUser[0]['fields']['lastfm_linked'] === false)
    {   return(
        <div class="form-group">
            <a class="link-button discogs-link" onClick={handleAuthURL}>
            Disconnect Last.fm Account
            </a>
        </div>
    )}
    else
    {   return(
        <div class="form-group">
            <a class="link-button discogs-link" onClick={handleAuthURL}>
            Link Discogs Account
            </a>
        </div>
    )}
}