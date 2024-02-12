// import logo from './logo.svg';
import './App.css';
import Login from "./login";
import MainPage from "./mainpage";
import RecommendationPage from "./recommends"
import PlaylistsPage from "./playlists"
import SettingsPage from './account-setup';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () =>{
    const handleLogin = await Login();
    setIsLoggedIn(handleLogin);
  }

  if (isLoggedIn === true){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />   
                <Route path="/recommends" element={<RecommendationPage/>} />   
                <Route path="/playlists" element={<PlaylistsPage/>} />   
                <Route path="/settings" element={<SettingsPage/>} />   
            </Routes>
        </BrowserRouter>
    );
  } else {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} exact/>
        </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
