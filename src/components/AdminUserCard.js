




function AdminUserCard({user}){

     return(
          <div className="admin-user-card">
               <div className="label-list">
                    <div className="label-leftpanel">
                         <div className="label-item">
                              <label htmlFor="">_id:</label>
                              <p>'{user._id}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">lastName:</label>
                              <p>'{user.lastName}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">firstName:</label>
                              <p>'{user.firstName}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">middleName:</label>
                              <p>'{user.middleName}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">suffix:</label>
                              <p>'{user.suffix}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">isAdmin:</label>
                              <p className="booltxt" >{user.isAdmin.toString()}</p>
                         </div>
                    </div>
                    <div className="label-rightpanel">
                         <div className="label-item">
                              <label htmlFor="">emailAddress:</label>
                              <p>'{user.email}'</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">mobileNumber:</label>
                              <p className="inttxt">{user.mobileNo}</p>
                         </div>
                         <div className="label-item">
                              <label htmlFor="">financingType:</label>
                              <p>'{user.financingType}'</p>
                         </div>
                    </div>
                    
               </div>
          </div>
     );
}

export default AdminUserCard;