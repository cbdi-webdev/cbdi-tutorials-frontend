import { createContext } from 'react';
import { toast, Flip, Slide, Bounce } from 'react-toastify';

const AlertContext = createContext();

export function AlertProvider({children}){

     const notifyerror = (error) => {
          return toast.error(error, {
               position: "top-center",
               autoClose: false,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               });
     }

     const notifysuccess = (success) => {
          return toast.success(success, {
               position: "top-center",
               autoClose: 2000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Bounce
               })
     }

     const notifyregister = (success) => {
          return (
               toast.success(success, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide
                    })
          )
     }

     const notifylogout = (success) => {
          return(
               toast.success(success, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip
                    })
          )
     }

     return(
          <AlertContext.Provider value={{notifyerror, notifysuccess, notifyregister, notifylogout}}>
               {children}
          </AlertContext.Provider>
     )

}

export default AlertContext;