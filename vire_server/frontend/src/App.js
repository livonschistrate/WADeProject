// import logo from './logo.svg';
import './App.css';
import Login from "./login";
import Logout from './logout';
import Register from "./register";
import MainPage from "./mainpage";
import RecommendationPage, { DislikedArtistsPage, LikedArtistsPage, LikedGenresPage, PurchasedPage, DislikedGenresPage } from "./recommends"
import PlaylistsPage from "./playlists"
import SettingsPage from './account-setup';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthUser = async () =>{
    try {
      const response = await fetch('http://localhost:8000/api/login/get-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
      });
      if(response.ok){
        const result = await response.json();
        localStorage.setItem('user_details', result)
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }    
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleAuthUser();
    
  }

  useEffect(() => {
    const checkLoggedInCookie = () => {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      const isLoggedInCookie = cookies.find(cookie => cookie.startsWith('vireLoggedIn='));

      if (isLoggedInCookie) {
        setIsLoggedIn(isLoggedInCookie.split('=')[1] === 'true');
      }
    };

    checkLoggedInCookie();
  }, []);  

  if (isLoggedIn === true){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />   
                <Route path="/recommendations" element={<RecommendationPage/>} />   
                <Route path="/recommendations/artist-likes" element={<LikedArtistsPage/>} />   
                <Route path="/recommendations/artist-dislikes" element={<DislikedArtistsPage/>} />   
                <Route path="/recommendations/genre-likes" element={<LikedGenresPage/>} />   
                <Route path="/recommendations/genre-dislikes" element={<DislikedGenresPage/>} />   
                <Route path="/recommendations/owned-music" element={<PurchasedPage/>} />   
                <Route path="/playlists" element={<PlaylistsPage/>} />   
                <Route path="/settings" element={<SettingsPage/>} />   
                <Route path="/logout" element={<Logout/>} /> 
            </Routes>
        </BrowserRouter>
    );
  } else {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} exact/>
          <Route path="/register" element={<Register onRegister={handleLogin}/>} exact/>
          <Route path="/logout" element={<Logout/>} /> 
        </Routes>
    </BrowserRouter>
    
  );
  }
}

export default App;
