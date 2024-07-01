import UserContext from './UserContext.js';
import AlertContext from './AlertContext.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';



function Logout(){

     const navigate = useNavigate();
     const { unsetUser, setUser } = useContext(UserContext);
     const { notifylogout } = useContext(AlertContext);

     

     useEffect(() => {
          unsetUser();

          setUser({
               id: null,
               isAdmin: null
          });

          notifylogout("Logged out successfully");
          
     },[]);

     

     return(
          
          <Navigate to ="/login" />
     );
}


export default Logout;