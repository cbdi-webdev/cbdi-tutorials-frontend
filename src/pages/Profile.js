import '../assets/css/partial-css/profile.css';
import { useEffect, useState } from 'react';




function Profile(){

     const [ profile, setProfile ] = useState({});

     const getFinancingType = (feed) => {
          if(feed == 'pagibigfinancing'){
               return "PagIBIG Financing"
          }else if(feed == 'bankfinancing'){
               return "Bank Financing"
          }else{
               return "Inhouse Financing"
          }
     }

     useEffect(() => {

          const fetchUser = async () => {
               const result = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
               });

               const data = await result.json();

               setProfile(data);
          }

          fetchUser();

     }, []);


     return(
          <div className="profile-page">
               <h2>My Account</h2>
               <div className="profile-dashboard-container">
                    {/* <button>Edit</button> */}
                    <h2 className="p-dashboard-title">PERSONAL INFORMATION</h2>
                    <div className="profile-dashboard">

                         <div className="p-dashboard-list">
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.firstName}
                                   </span>
                                   <label>First Name</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.lastName}
                                   </span>
                                   <label>Last Name</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.middleName}
                                   </span>
                                   <label>Middle Name</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.nameSuffix}
                                   </span>
                                   <label>Suffix</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.email}
                                   </span>
                                   <label>Email Address</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {profile.mobileNo}
                                   </span>
                                   <label>Mobile Number</label>
                              </div>
                              <div className="p-dashboard-item">
                                   <span className="p-dashboard-field">
                                        {getFinancingType(profile.financingType)}
                                   </span>
                                   <label>Financing Type</label>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}


export default Profile;