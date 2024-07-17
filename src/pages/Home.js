import logo from '../assets/images/cbdilogo.png';
import '../assets/css/partial-css/home.css';
import accountImg from '../assets/images/account.png';
import settingsImg from '../assets/images/settings.png';
import videosImg from '../assets/images/videosImg.png';
import { Link } from 'react-router-dom';
import UserContext from '../utilities/UserContext.js';
import AlertContext from '../utilities/AlertContext.js';
import { useContext } from 'react';



function Home(){

     const { user } = useContext(UserContext);
     const { notifyerror } = useContext(AlertContext);


     const handleCheckIsAdmin = () => {
          if(!user.isAdmin){
               return notifyerror('Access Forbidden: For Admin Users Only');
          }
     }
     
     return(
          <div className="home-container">
               <div className="home-dashboard">
                    <h1>CBDI Orientation Videos for Homebuyers</h1>
                    <div className="dashboard-list">

                         <div className="dashboard-item">
                              <Link to="/profile">
                                   <div className="dashboard-box">
                                        <div className="dashboard-img-container">
                                             <img src={accountImg} className="dashboard-img" loading="lazy" />
                                        </div>
                                   </div>
                              </Link>
                              <h5>Account</h5>
                         </div>

                         <div className="dashboard-item">
                              <Link to="/videos">
                                   <div className="dashboard-box">
                                        <div className="dashboard-img-container">
                                             <img src={videosImg} className="dashboard-img" loading="lazy" />
                                        </div>
                                   </div>
                              </Link>
                              <h5>Videos</h5>
                         </div>

                         <div className="dashboard-item">
                              <Link to="/admin">
                                   <div className="dashboard-box" onClick={handleCheckIsAdmin}>
                                        <div className="dashboard-img-container">
                                             <img src={settingsImg} className="dashboard-img" loading="lazy" />
                                        </div>
                                   </div>
                              </Link>
                              <h5>Admin</h5>
                         </div>

                    </div>
               </div>
          </div>
     );
}


export default Home;