import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.js';
import UserContext from './utilities/UserContext.js';
import { useState, useEffect } from 'react';
import Logout from './utilities/Logout.js';
import NonMemberRoutes from './utilities/NonMemberRoutes.js';
import MemberRoutes from './utilities/MemberRoutes.js';
import Videos from './pages/Videos.js';
import { AlertProvider } from './utilities/AlertContext.js';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer.js';
import Hero from './components/Hero.js';
import './assets/css/partial-css/home.css';

function App() {

  const [user, setUser] = useState({});

  const unsetUser = () => {
    localStorage.clear();
  }
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(result => result.json())
    .then(data => {
      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          financingType: data.financingType
        })
      } else{
        setUser({
          id: null,
          isAdmin: null,
          financingType: null
        })

      }
    })
  }, []);


  useEffect(() => {
    function checkLocalStorage(){
       const item = localStorage.getItem('token');
       if (item === null){
         window.location.reload(false);
       }
     }
     
     window.addEventListener('storage', checkLocalStorage)
 
     return () => {
     window.removeEventListener('storage', checkLocalStorage)
     }
 
   }, []);


  return (
    <>
      <UserContext.Provider value={{user, setUser, unsetUser}}>
        <AlertProvider>
        <Navbar />
        <Hero />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route element={<MemberRoutes />}>
                <Route path="/videos" element={<Videos />} />
            </Route>
            
            <Route element={<NonMemberRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
        </AlertProvider>
      </UserContext.Provider>
      <ToastContainer /> 
    </>
  );
}

export default App;