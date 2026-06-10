import '../assets/css/partial-css/admin.css';
import allusers from '../assets/images/allusers.png';
import videosImg from '../assets/images/videosImg.png';
import settingsImg from '../assets/images/settings.png';
import { Link } from 'react-router-dom';

function Admin(){
     return(
          <div className="admin-page-container">
               <div className="admin-upflex">
                    <h1 className="admin-title">Admin Dashboard</h1>
               </div>
               <div className="admin-dashboard">
                    <div className="admin-dashboard-list">
     
                         <Link to="/admin/users" className="admin-links">
                              <div className="admin-dashboard-item">
                                   <div className="admin-dashboard-item-img-container">
                                        <img src={allusers} className="admin-dashboard-item-img" alt="" />
                                   </div>
                                   <span>view users</span>
                              </div>
                         </Link>

                         <Link to="/admin/videos" className="admin-links">
                              <div className="admin-dashboard-item">
                                   <div className="admin-dashboard-item-img-container">
                                        <img src={videosImg} className="admin-dashboard-item-img" alt="" />
                                   </div>
                                   <span>manage videos</span>
                              </div>
                         </Link>

                         <Link to="/admin/steps" className="admin-links">
                              <div className="admin-dashboard-item">
                                   <div className="admin-dashboard-item-img-container">
                                        <img src={settingsImg} className="admin-dashboard-item-img" alt="" />
                                   </div>
                                   <span>manage steps</span>
                              </div>
                         </Link>

                    </div>
               </div>
          </div>
     );
}

export default Admin;