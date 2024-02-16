import React, { useState } from "react";
import "./login.css";
import { useNavigate} from 'react-router-dom'


const Register = ({ onRegister }) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [checkPass, checkPassword] = useState('');

    const navigate = useNavigate();

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
                    onRegister();
                    navigate('/');
                    setCookie("vireLoggedIn", true, 1);
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

    return(
      <div className="login-wrapper">
        <div className="login-container">
            <h2>ViRE - Vinyl Recommender</h2>
            <form className="login-form" action="" onSubmit={handleRegisterInfo}  method="POST">
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
            
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
                </form>
            <p style={{ cursor: 'pointer' }}>
              <a href="/">Already have an account? Login here.</a>
            </p>
        </div>
      </div> 
        );      
}

export default Register;