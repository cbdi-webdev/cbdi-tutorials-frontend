import { useContext } from 'react';
import UserContext from './UserContext.js';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home.js';




function NonMemberRoutes(){

     const { user } = useContext(UserContext);

     return(
          (user.id !== undefined)
          ?
          <Home />
          :
          <Outlet />
          
     );
}


export default NonMemberRoutes;