import ReactPlayer from 'react-player';
import Spinner from './Spinner.js';



const VideosComponent = ({videos, isLoading}) => {

     if(isLoading){
          return <Spinner />
     }

     


     return(
          <div className="videos-component-container">
               {
                    videos.map(video => (
                              <div key={video._id}>
                                   <ReactPlayer  url={video.src} controls />
                                   <h1>{video.title}</h1>
                              </div>
                         ) 
                    )
               }
          </div>
     );
}


export default VideosComponent;