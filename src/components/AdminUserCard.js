import { useState, useContext } from 'react';
import AlertContext from '../utilities/AlertContext.js';
import '../assets/css/partial-css/adminUserCard.css';

function AdminUserCard({ user }) {
     const [financingType, setFinancingType] = useState(user.financingType || '');
     const [isSaving, setIsSaving] = useState(false);
     const { notifysuccess, notifyerror } = useContext(AlertContext);

     const saveFinancingType = async () => {
          setIsSaving(true);
          try {
               const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/users/${user._id}/financing-type`,
                    {
                         method: 'PATCH',
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ financingType }),
                    }
               );

               if (response.ok) {
                    notifysuccess('Financing type updated successfully.');
               } else {
                    const message = await response.json();
                    notifyerror(message || 'Failed to update financing type.');
               }
          } catch {
               notifyerror('An unexpected error occurred.');
          } finally {
               setIsSaving(false);
          }
     };

     return (
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
                              <p className="booltxt">{user.isAdmin.toString()}</p>
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
                              <div className="financing-type-edit">
                                   <select
                                        value={financingType}
                                        onChange={(e) => setFinancingType(e.target.value)}
                                        className="financing-type-input"
                                   >
                                        <option value="pagibigfinancing">pagibigfinancing</option>
                                        <option value="bankfinancing">bankfinancing</option>
                                        <option value="inhousefinancing">inhousefinancing</option>
                                   </select>
                                   <button
                                        onClick={saveFinancingType}
                                        disabled={isSaving}
                                        className="financing-type-save-btn"
                                   >
                                        {isSaving ? 'Saving...' : 'Save'}
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default AdminUserCard;
