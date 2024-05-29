import UserContext from './UserContext.js';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login.js';






function MemberRoutes(){

     const { user } = useContext(UserContext);

     return(
          (user.id == null)
          ?
          <Login />
          :
          <Outlet />
     );
}

export default MemberRoutes;