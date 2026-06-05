import UserContext from './UserContext.js';
import AlertContext from './AlertContext.js';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';



function Logout(){

     const { unsetUser, setUser } = useContext(UserContext);
     const { notifylogout } = useContext(AlertContext);

     

     useEffect(() => {
          unsetUser();

          setUser({
               id: null,
               isAdmin: null
          });

          notifylogout("Logged out successfully");
          
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);

     

     return(
          
          <Navigate to ="/login" />
     );
}


export default Logout;