import UserContext from './UserContext.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';


function Logout(){

     const navigate = useNavigate();
     const { unsetUser, setUser } = useContext(UserContext);

     unsetUser();

     useEffect(() => {
          setUser({
               id: null,
               isAdmin: null
          });
     });

     alert("Logged out successfully");

     return(
          
          <Navigate to ="/login" />
     );
}


export default Logout;