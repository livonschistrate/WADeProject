// import logo from './logo.svg';
import './App.css';
import Login from "./login";
import Logout from './logout';
import Register from "./register";
import MainPage from "./mainpage";
import RecommendationPage from "./recommends"
import PlaylistsPage from "./playlists"
import SettingsPage from './account-setup';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

export let emailAuthenticated;
export let usernameAuthenticated;

export function setEmailAuth(emailAuthenticated){
  emailAuthenticated = {email:emailAuthenticated};
}

// export function setUserAuth(userAuthenticated){
//   this.usernameAuthenticated = userAuthenticated;
// }

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthUser = async () =>{
    try {
      const response = await fetch('http://localhost:8000/api/login/?email=${emailAuthenticated}');
      console.log(response);
      const result = response.json();
      // emailAuthenticated = result.email;
      usernameAuthenticated = result.username;
      console.log(emailAuthenticated);
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
                <Route path="/recommends" element={<RecommendationPage/>} />   
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
