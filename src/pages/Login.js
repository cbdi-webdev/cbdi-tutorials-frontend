import '../assets/css/partial-css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../utilities/UserContext.js';



function Login(){

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const navigate = useNavigate();
     const { user, setUser } = useContext(UserContext);

     async function loginUser(e){
          e.preventDefault();

          const result = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
               method: 'POST',
               headers: {
                    'Content-type': 'application/json'
               },
               body: JSON.stringify({
                    email: email,
                    password: password
               })
          })

          const data = await result.json();

          if(!result.ok){
               setPassword("");
               setEmail("");
               alert(data);
          }else {
               alert('Successfully Logged In.');
               localStorage.setItem('token', data);
               retrieveUserDetails(data);

               /* setTimeout(function(){
                    window.location.reload();
                 }, 1500); */

               navigate('/videos');
          }
     }
     
     const retrieveUserDetails = (accessToken) => {
          fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
          .then(res => res.json())
          .then(data => {
               setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
               })
          })
     }

     
     return(
          <div className="login-page">
               <div className="login-form-container">
                    <form className="login-form-card">
                         <h1 className="login-form-title">User Login</h1>
                         <div className="user-login-fields">
                              <input 
                              type="text" 
                              placeholder="Email" 
                              className="user-input-field"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                               />
                              <input 
                              type="password" 
                              placeholder="Password" 
                              className="user-input-field" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              />
                              <button onClick={loginUser} className="user-login-btn" >Login</button>
                              <Link to="/register"><button className="user-login-btn2" >Create Account</button></Link>
                         </div>
                    </form>
               </div> 
          </div>
     );
}

export default Login;