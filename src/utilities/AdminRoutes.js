import UserContext from './UserContext.js';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home.js';



function AdminRoutes(){

     const { user } = useContext(UserContext);


     return(
               ((user.id !== null) && (user.isAdmin === true))

               ?

               <Outlet />

               :       
               
               <Home />
     );
}

export default AdminRoutes;