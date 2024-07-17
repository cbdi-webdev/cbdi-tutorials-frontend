import '../assets/css/partial-css/admin.css';
import allusers from '../assets/images/allusers.png';
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
                                        <img src={allusers} className="admin-dashboard-item-img" />
                                   </div>
                                   <span>view users</span>
                              </div>
                         </Link>
                         
                    </div>
               </div>
          </div>
     );
}

export default Admin;