import '../assets/css/partial-css/admin.css';
import { Link } from 'react-router-dom';
import AdminUserCard from '../components/AdminUserCard.js';
import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner.js';



function AdminViewUsers(){

     const [isLoading, setIsLoading] = useState(false);
     const [users, setUsers] = useState([]);

     useEffect(() => {
          const fetchUsers = async () => {
               setIsLoading(true);
               const result = await fetch(`${process.env.REACT_APP_API_URL}/users`,{
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`
                       }
               });
               const data = await result.json();
               setUsers(data);
               setIsLoading(false);
               
          }    

          fetchUsers();
          
     }, []);

     

     return(
          <div className="admin-view-users-page-container">
               <div className="admin-upflex">
                    <h1 className="admin-title">All Users</h1>
                    <Link to="/admin"><span>BACK TO DASHBOARD &lt;&lt; </span></Link>
               </div>
               <div className="admin-dashboard">
                    <div className="admin-card-container">

                         {      
                              !isLoading ?

                         
                              users.map(user => {

                                   return <AdminUserCard key={user._id} user={user} />   
                              })

                              :
                              <div className="spinna-container">
                                   <Spinner />
                              </div>     
                         }
                         
                    </div>   
               </div>
          </div>
          
     );
}

export default AdminViewUsers;