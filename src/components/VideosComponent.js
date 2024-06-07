import ReactPlayer from 'react-player';
import Spinner from './Spinner.js';
import '../assets/css/partial-css/video.css';



const VideosComponent = ({videos, isLoading}) => {

     if(isLoading){
          return <Spinner />
     }

     return(
          <div className="videos-component-container">
               {
                    videos.map(video => (
                              <div key={video._id}>
                                   <div className="video-wrapper">
                                      <ReactPlayer  
                                      url={video.src} 
                                      width="100%"
                                      height="100%"
                                      controls
                                      className="react-player"
                                      />
                                   </div>
                                   <h1 className="video-title">{video.title}</h1>
                              </div>
                         ) 
                    )
               }
          </div>
     );
}


export default VideosComponent;