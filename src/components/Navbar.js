import navbar from '../assets/css/partial-css/navbar.css';
import { Link } from 'react-router-dom';
import UserContext from '../utilities/UserContext.js';
import { useContext, useState } from 'react';





function Navbar(){

     const { user } = useContext(UserContext);
     const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

     const handleToggleMenu = () => {
          setIsMobileMenuActive(!isMobileMenuActive);
          
     }


     return(
     <>
          <nav className="navbar-container">
               <Link to="/">
                    <div className="nav-brand-img-container">
                         <img src="/images/asd.png" alt="brandlogo" className="nav-brand-img" />
                    </div>
               </Link>
               

               <div className="nav-list">
                    {/* <ul>
                         <li><Link to="/" className="nav-link">Home</Link></li>
                         <li><Link to="/videos" className="nav-link">Videos</Link></li>
                         <li>About</li>
                    </ul> */}
               </div>


               <div className="nav-user-container">
                    {
                         (user.id !== null)
                         ?
                         <ul>
                              <li><Link to="/logout" className="nav-link" >Logout</Link></li>
                         </ul>
                         :
                         <ul>
                              <li><Link to="/login" className="nav-link" >Login</Link></li>
                              <li><Link to="/register" className="nav-link" >Register</Link></li>
                         </ul>
                    }
               </div>
          </nav>
          
          <nav className="mobile-nav">
               <Link to="/">
                    <div className="nav-brand-img-container-mobile">
                         <img src="/images/asd.png" alt="brandlogo" className="nav-brand-img" />
                    </div>
               </Link>

               <div className={isMobileMenuActive ? "mobile-nav-list-container open" : "mobile-nav-list-container"} >
                    <div className="nav-list-mobile">
                         <ul>
                              <li onClick={handleToggleMenu}><Link to="/" className="nav-link">Home</Link></li>
                              <li onClick={handleToggleMenu}><Link to="/videos" className="nav-link">Videos</Link></li>
                              <li onClick={handleToggleMenu}><Link to="/admin" className="nav-link">Admin</Link></li>
                         </ul>
                    </div>

                    <div>
                         <hr className="horizontal-border"/>
                    </div>


                    <div className="nav-user-container-mobile">
                         {
                              (user.id !== null)
                              ?
                              <ul>
                                   <li onClick={handleToggleMenu}><Link to="/logout" className="nav-link" >Logout</Link></li>
                              </ul>
                              :
                              <ul>
                                   <li onClick={handleToggleMenu}><Link to="/login" className="nav-link" >Login</Link></li>
                                   <li onClick={handleToggleMenu}><Link to="/register" className="nav-link" >Register</Link></li>
                              </ul>
                         }
                    </div>
               </div>

               <div className={isMobileMenuActive ? "hamburger open" : "hamburger"} onClick={handleToggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
               </div>
               
          </nav>
     </>
     );
}


export default Navbar;