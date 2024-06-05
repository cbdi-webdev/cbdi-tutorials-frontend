import ReactPlayer from 'react-player';
import UserContext from '../utilities/UserContext.js';
import { useContext, useState, useEffect } from 'react';
import Spinner from '../components/Spinner.js';



function Videos(){

     
     const { user } = useContext(UserContext);
     const [ isLoading, setIsLoading ] = useState(false);
     const [ videos, setVideos ] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [videosPerPage, setVideosPerPage] = useState(1);


     /* useEffect(() => {
          fetch(`${process.env.REACT_APP_API_URL}/videos`)
          .then(result => result.json())
          .then(data => {

               setVideos(data);
               setIsLoading(false);

          })
     }, [])
      */

     useEffect(() => {
          const fetchVideos = async () => {
               setIsLoading(true);
               const result = await fetch(`${process.env.REACT_APP_API_URL}/videos`,{
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`
                       }
               });
               const data = await result.json();
               setVideos(data);
               setIsLoading(false);
               
               
          }    

          fetchVideos();
          
     }, []);


     return(
          <div className="Videos-page-container">
               {
                    isLoading ?

                    <Spinner />

                    :

                    <div className="video-content-container">
                         {
                              videos.map(video => {

               
                                   return(
                                        <div key={video._id}>
                                             <ReactPlayer  url={video.src} controls />
                                             <h1>{video.title}</h1>
                                        </div>
                                   )
                              })
                         }
                    </div>
               }
          </div>
     );
}


export default Videos;