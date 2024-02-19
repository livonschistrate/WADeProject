import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }    
      
      const loggedInUser = JSON.parse(localStorage.getItem('user_details'));
      setCookie("vireLoggedIn", false, 1);

      try {
        const response = fetch('http://localhost:8000/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: loggedInUser[0]['pk'] }),
        });
  
        if (response.ok) {
          const result = response.json();
          if (result.success) {                               
            console.log('Logout successful');
          } else {
            console.error('Logout failed:', result.errors);
          }
        } else {
          console.error('Response error:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }

      const navigate = useNavigate();
      navigate('/');

}