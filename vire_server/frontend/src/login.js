import React, { useState } from "react";
import "./login.css";


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
                onLogin();                
                localStorage.setItem('loggedInUsername', email);                
                localStorage.setItem('user_id', result.user_id);
                setCookie("vireLoggedIn", true, 1);
              } else {
                console.error('Login failed:', result.errors);
                alert("Login failed. Retype email or password again.");
              }
              console.log(result)
            } else {
              console.error('Response error:', response.statusText);
            }
          } catch (error) {
            console.error('Fetch error:', error.message);
          }

        console.log(`Email: ${email}, Password: ${password}`);
    }    

  return (
    <div className="login-wrapper">
      <div className="login-container">
          <h2>ViRE - Vinyl Recommender</h2>
          <form className="login-form" action="" onSubmit={handleLoginInfo} method="POST">
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
          <p style={{ cursor: 'pointer' }}>
            <a href="/register">Don&apos;t have an account? Register here.</a>
          </p>
      </div>
    </div>   
    );
    
}

export default Login;