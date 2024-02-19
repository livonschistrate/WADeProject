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
            <label for="search">Search for songs, vinyls:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
            <div class="pref-button-group">
            <button class="i-like" type="submit">
                <a href="/recommendations/artist-likes">Artists that I like</a></button>
            <button class="i-dislike" type="submit">
                <a href="/recommendations/artist-dislikes">Artists that I don't like</a></button>
            </div>
            <div class="pref-button-group">
            <button class="i-like" type="submit">
                <a href="/recommendations/genre-likes">Genres that I like</a></button>
            <button class="i-dislike" type="submit">
                <a href="/recommendations/genre-dislikes">Genres that I don't like</a></button>
            </div>
            <div class="pref-button-group">
            <button class="i-own" type="submit">
                <a href="/recommendations/owned-music">Past song/album purchases</a></button>
            </div>
        </section>
        <MainPageFooter/>
    </div>
    );
}

export function LikedArtistsPage(){
    const [searchText, setSearchText] = useState("");

    return (
    <div>
        <MainPageHeader/>
        <section class="info-container">
            <div className="form-group">
            <h2>Liked artists</h2>
            <label for="search">Search for artist here:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>)
}

export function DislikedArtistsPage(){
    const [searchText, setSearchText] = useState("");

    return (
    <div>
        <MainPageHeader/>
        <section class="info-container">
        <div className="form-group">
            <h2>Disliked artists</h2>
            <label for="search">Search for artist here:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>)
}

export function LikedGenresPage(){
    const [searchText, setSearchText] = useState("");

    return (
    <div>
        <MainPageHeader/>
        <section class="info-container">
        <div className="form-group">
            <h2>Liked genres</h2>
            <label for="search">Search for genre:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>)
}

export function DislikedGenresPage(){
    const [searchText, setSearchText] = useState("");

    return (
    <div>
        <MainPageHeader/>
        <section class="info-container">
        <div className="form-group">
            <h2>Disliked genres</h2>
            <label for="search">Search for genre:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>)
}

export function PurchasedPage(){
    const [searchText, setSearchText] = useState("");

    return (
    <div>
        <MainPageHeader/>
        <section class="info-container">
        <div className="form-group">
            <h2>Past music purchases</h2>
            <label for="search">Search for your purchases:</label>
            <input type="text" id="search" 
                    onChange={(e) => setSearchText(e.target.value)}/>
            </div>
        </section>
        <MainPageFooter/>
    </div>)
}
