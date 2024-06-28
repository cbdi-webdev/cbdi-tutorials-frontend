import { useContext, useState, useEffect } from 'react';
import VideosComponent from '../components/VideosComponent.js';
import Pagination from '../components/Pagination.js';
import '../assets/css/partial-css/video.css';



function Videos(){

     const [isLoading, setIsLoading] = useState(false);
     const [videos, setVideos] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [videosPerPage, setVideosPerPage] = useState(1);

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

     // Get Current Videos
     const indexOfLastVideo = currentPage * videosPerPage;
     const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
     const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)
    /*  console.log(videos);
     console.log(currentVideos); */

     // Change Page

     const paginate = (pageNumber) => setCurrentPage(pageNumber)

     // Handle Next and Previous Page Clicks

     const handleNextPage = () => {
          if(currentPage < Math.ceil(videos.length / videosPerPage)){
               setCurrentPage(currentPage + 1);
          }
     }
     
     const handlePreviousPage = () => {
          if(currentPage > 1) {
               setCurrentPage(currentPage - 1);
          }
     }


     return(
          <div className="videos-page-container">
               <VideosComponent videos={currentVideos} isLoading={isLoading} />
               <Pagination 
               videosPerPage={videosPerPage} 
               totalVideos={videos.length} 
               paginate={paginate} 
               handleNextPage={handleNextPage}
               handlePreviousPage={handlePreviousPage}
               currentPage={currentPage}
               />
               <div className="side-panel">
                    <h5>Video Playlist ({currentPage}/{videos.length})</h5>
                    <ul className="side-list">
                         {videos.map(video => <li key={video._id} className={ video.title == currentVideos[0].title ? "side-item active" : "side-item" }>{video.title}</li>)}
                    </ul>
               </div>
          </div>
     );
}


export default Videos;