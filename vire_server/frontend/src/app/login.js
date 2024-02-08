"use client";

import React, { useState } from "react";
import "./login.css";

export default function Login(){
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [checkPass, checkPassword] = useState('');

    const handleToggle = () => {
        setIsLogin(!isLogin);
    }

    const handleLoginInfo = async (e) =>{
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                console.log('Login successful');
              } else {
                console.error('Login failed:', result.errors);
              }
            } else {
              console.error('Response error:', response.statusText);
            }
          } catch (error) {
            console.error('Fetch error:', error.message);
          }

        console.log(`Email: ${email}, Password: ${password}`);
    }

    const handleRegisterInfo = async (e) =>{
        if (checkPass === password){
            e.preventDefault();

            try {
                const response = await fetch('http://localhost:8000/api/register/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, username, password }),
                });
          
                if (response.ok) {
                  const result = await response.json();
                  if (result.success) {
                    console.log('Register successful');
                  } else {
                    console.error('Register failed:', result.errors);
                  }
                } else {
                  console.error('Response error:', response.statusText);
                }
              } catch (error) {
                console.error('Fetch error:', error.message);
              }

            console.log(`Email: ${email}, Username: ${username}, Password: ${password}`);
        } else {
            alert("Check the passwords and retype again.");
        }
    }

    if(isLogin == true){
        return (
    <div class="login-container">
        <h2>ViRE - Vinyl Recommender</h2>
        <form class="login-form" action="{% url login %}" onSubmit={handleLoginInfo} method="POST">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" required
                    onChange={(e) => setEmail(e.target.value)}/>
        </div>
    
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" required
                    onChange={(e) => setPassword(e.target.value)}/>
        </div>
    
        <div class="form-group">
            <button type="submit">Login</button>
        </div>
        </form>
        <p onClick={handleToggle} style={{ cursor: 'pointer' }}>
          Don&apos;t have an account? Register here.
        </p>
    </div>);
    } else {
        return(
    <div class="login-container">
        <h2>ViRE - Vinyl Recommender</h2>
        <form class="login-form" onSubmit={handleRegisterInfo}>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" required
                        onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="Username">Username:</label>
                <input type="text" id="Username" required
                        onChange={(e) => setUsername(e.target.value)}/>
            </div>
        
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" required
                        onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="password">Retype password:</label>
                <input type="password" id="password" required
                        onChange={(e) => checkPassword(e.target.value)}/>
            </div>
        
            <div class="form-group" onClick={() => this.handleRegisterInfo()}>
                <button type="submit">Register</button>
            </div>
            </form>
        <p onClick={handleToggle} style={{ cursor: 'pointer' }}>
            Already have an account? Login here.
        </p>
    </div> 
        );
    
    }
    
}