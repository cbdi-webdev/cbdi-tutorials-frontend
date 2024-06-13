import ReactPlayer from 'react-player';
import Spinner from './Spinner.js';
import '../assets/css/partial-css/video.css';
import playBtn from '../assets/images/play.png';
import soundz from '../assets/images/soundz.png';
import fullscreen from '../assets/images/fullscreen.png';


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
                                      controls={false}
                                      className="react-player"
                                      />

                                      <div className="controls-wrapper">
                                        <h2 className="controls-title">{video.title}</h2>
                                        <div className="controls-middle">
                                             <img src={playBtn} className="playBtnMid" />
                                        </div>
                                        <div className="controls-bottom">
                                             <input type="range" />
                                             <div className="controls-bottom2">
                                                  <img src={playBtn} className="bottomBtns" />
                                                  <div>
                                                       <img src={soundz} className="bottomBtns" />
                                                       <input type="range" />
                                                  </div> 
                                                  <img src={fullscreen} className="bottomBtns" />
                                             </div>
                                             
                                        </div>
                                      </div>
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