import React, { useState } from "react";
import "./login.css";
// import {Link, useNavigate} from 'react-router-dom'


export default function Login(){
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [checkPass, checkPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

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
              body: JSON.stringify({ email:email, password:password }),
            });
      
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                console.log('Login successful');
                setLoginSuccess(true);
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
        return loginSuccess;
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
                  body: JSON.stringify({ email:email, username:username, password:password }),
                });
          
                if (response.ok) {
                  const result = await response.json();
                  if (result.success) {
                    console.log('Register successful');
                    setLoginSuccess(true);
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
            return loginSuccess;
        } else {
            alert("Check the passwords and retype again.");
        }
    }

    if(isLogin === true){
        return (
    <div className="login-container">
        <h2>ViRE - Vinyl Recommender</h2>
        <form className="login-form" action="{% url login %}" onSubmit={handleLoginInfo} method="POST">
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        </div>
    
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
        </div>
    
        <div className="form-group">
            <button type="submit">Login</button>
        </div>
        </form>
        <p onClick={handleToggle} style={{ cursor: 'pointer' }}>
          Don&apos;t have an account? Register here.
        </p>
    </div>);
    } else {
        return(
    <div className="login-container">
        <h2>ViRE - Vinyl Recommender</h2>
        <form className="login-form" onSubmit={handleRegisterInfo}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="Username">Username:</label>
                <input type="text" id="Username" value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
            </div>
        
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Retype password:</label>
                <input type="password" id="password" value={checkPass}
                        onChange={(e) => checkPassword(e.target.value)}/>
            </div>
        
            <div className="form-group" onClick={() => this.handleRegisterInfo()}>
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