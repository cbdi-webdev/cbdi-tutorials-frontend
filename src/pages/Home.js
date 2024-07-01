import logo from '../assets/images/cbdilogo.png';
import '../assets/css/partial-css/home.css';
import accountImg from '../assets/images/account.png';
import settingsImg from '../assets/images/settings.png';
import videosImg from '../assets/images/videosImg.png';
import { Link } from 'react-router-dom';


function Home(){
     return(
          <div className="home-container">
               <div className="home-dashboard">
                    <h1>CBDI Orientation Videos for Homebuyers</h1>
                    <div className="dashboard-list">

                         <div className="dashboard-item">
                              <div className="dashboard-box">
                                   <Link to="/login">
                                   <div className="dashboard-img-container">
                                        <img src={accountImg} className="dashboard-img" />
                                   </div>
                                   </Link>
                              </div>
                              <h5>Account</h5>
                         </div>

                         <div className="dashboard-item">
                              <div className="dashboard-box">
                                   <Link to="/videos">
                                   <div className="dashboard-img-container">
                                        <img src={videosImg} className="dashboard-img" />
                                   </div>
                                   </Link>
                              </div>
                              <h5>Videos</h5>
                         </div>

                         <div className="dashboard-item">
                              <div className="dashboard-box">
                                   <Link to="/">
                                   <div className="dashboard-img-container">
                                        <img src={settingsImg} className="dashboard-img" />
                                   </div>
                                   </Link>
                              </div>
                              <h5>Admin</h5>
                         </div>

                    </div>
               </div>
          </div>
     );
}


export default Home;