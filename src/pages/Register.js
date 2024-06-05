import '../assets/css/partial-css/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



function Register(){

     const [lastName, setLastName] = useState("");
     const [firstName, setFirstName] = useState("");
     const [middleName, setMiddleName] = useState("");
     const [nameSuffix, setNameSuffix] = useState("");
     const [emailAddress, setEmailAddress] = useState("");
     const [mobileNumber, setMobileNumber] = useState("");
     const [password1, setPassword1] = useState("");
     const [password2, setPassword2] = useState("");
     const [financingType, setFinancingType] = useState("");
     const navigate = useNavigate();

     const clearInput = () => {
          setPassword1("");
          setPassword2("");

     }

     async function registerUser(e){
          e.preventDefault();

          if(password1 !== password2){

               clearInput();

               return alert("Password did not match. Try again");
          }

          try{
               const result = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                    method: 'POST',
                    headers: {
                         'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                         lastName: lastName,
                         firstName: firstName,
                         middleName: middleName,
                         nameSuffix: nameSuffix,
                         email: emailAddress,
                         mobileNo: mobileNumber,
                         password: password1,
                         financingType: financingType
                    })
               })
               
               const data = await result.json();

               if(!result.ok){
                    alert(data);
                    clearInput();
               } else{
                    alert("Account created successfully.");
                    navigate('/login');
               }


          } catch{
               clearInput();
               alert("Fetching API Error");
          }
     }

     return(
          <div className="register-page">
               <div className="register-form-container">
                    <form className="register-form-card">
                         <h1 className="register-form-title">Register User</h1>
                         <div className="user-register-fields">
                              <div className="user-register-fields-left">
                                   <div className="user-register-field-item">
                                        <label htmlFor="lastName" className="user-register-label">Last Name<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="text" 
                                        className="user-input-field"
                                        id="lastName"
                                        value={lastName}
                                        onChange={ (e) => setLastName(e.target.value) }
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="firstName" className="user-register-label">First Name<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="text" 
                                        className="user-input-field"
                                        id="firstName"
                                        value={firstName}
                                        onChange={ (e) => setFirstName(e.target.value) }
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="middleName" className="user-register-label">Middle Name</label>
                                        <input 
                                        type="text" 
                                        className="user-input-field"
                                        id="middleName"
                                        value={middleName}
                                        onChange={ (e) => setMiddleName(e.target.value) }
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="nameSuffix" className="user-register-label">Suffix</label>
                                        <input 
                                        type="text" 
                                        className="user-input-field"
                                        id="nameSuffix"
                                        value={nameSuffix}
                                        onChange={ (e) => setNameSuffix(e.target.value) }
                                        />
                                   </div>
                              </div>
                              <div className="user-register-fields-right">
                                   <div className="user-register-field-item">
                                        <label htmlFor="emailAddress" className="user-register-label">Email Address<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="email" 
                                        className="user-input-field"
                                        id="emailAddress"
                                        value={emailAddress}
                                        onChange={ (e) => setEmailAddress(e.target.value) }
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="mobileNumber" className="user-register-label">Mobile Number<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="number" 
                                        className="user-input-field"
                                        id="mobileNumber"
                                        value={mobileNumber}
                                        onChange={ (e) => setMobileNumber(e.target.value)}
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="password1" className="user-register-label">Password<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="password" 
                                        className="user-input-field"
                                        id="password1"
                                        value={password1}
                                        onChange={ (e) => setPassword1(e.target.value)}
                                        />
                                   </div>
                                   <div className="user-register-field-item">
                                        <label htmlFor="password2" className="user-register-label">Confirm Password<span className="asterisk-red">&#42;</span></label>
                                        <input 
                                        type="password" 
                                        className="user-input-field"
                                        id="password2"
                                        value={password2}
                                        onChange={ (e) => setPassword2(e.target.value)}
                                        />
                                   </div>
                              </div>    
                         </div>
                         <div className="financing-type-container">
                              <label className="user-register-label">Financing Type<span className="asterisk-red">&#42;</span></label>
                              <div className="financing-type-radio" onChange={ e => setFinancingType(e.target.value) }>
                                   <div>
                                        <input type="radio" name="financing-option" id="bank-financing-option" value="bankfinancing" />
                                        <label htmlFor="bank-financing-option" className="user-register-label">Bank Financing</label>
                                   </div>
                                   <div>
                                        <input type="radio" name="financing-option" id="pagibig-financing-option" value="pagibigfinancing" />
                                        <label htmlFor="pagibig-financing-option" className="user-register-label">PagIBIG Financing</label>
                                   </div>
                                   <div>
                                        <input type="radio" name="financing-option" id="inhouse-financing-option" value="inhousefinancing" />
                                        <label htmlFor="inhouse-financing-option" className="user-register-label">Inhouse Financing</label>
                                   </div>
                              </div>
                         </div>
                         <div className="user-register-bottom">
                              <button onClick={registerUser} className="user-register-btn" >Create Account</button>
                              <div className="register-btn2">
                                   <span>Already have an account?</span>
                                   <Link to="/login" className="register-btn2-link">Log in here</Link>
                              </div>
                         </div>
                    </form>
               </div> 
          </div>
     );
}

export default Register;