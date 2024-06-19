import ReactPlayer from 'react-player';
import Spinner from './Spinner.js';
import '../assets/css/partial-css/video.css';
import playBtn from '../assets/images/play.png';
import pauseBtn from '../assets/images/pause.png';
import soundz from '../assets/images/soundz.png';
import mutez from '../assets/images/muted.png';
import fullscreen from '../assets/images/fullscreen.png';
import {useState, useEffect} from 'react';


const VideosComponent = ({videos, isLoading}) => {
     const [duration, setDuration] = useState(0);
     const [currentTime, setCurrentTime] = useState(0);
     const [isPlaying, setIsPlaying] = useState(false);
     const [volume, setVolume] = useState(1);
     const [previousVolume, setPreviousVolume] = useState(1);
     

     const handlePlayPause = () => {
          setIsPlaying(!isPlaying);
     }

     const handleDuration = (newDuration) => {
          setDuration(newDuration);
     }


     const handleProgress = (progress) => {
          if (!progress.played) return; // Skip updates if progress info is unavailable
          const newCurrentTime = progress.played * duration; // Calculate current time based on duration and played fraction
          setCurrentTime(newCurrentTime);
        }

     const handleVolumeChange = (e) => {
          const newVolume = parseFloat(e.target.value) / 100; // Normalize to 0-1 range
          setVolume(newVolume);
     }

     const handleVolumeToggle = () => {
          if (volume > 0) { // Only store previous volume if not already muted
            setPreviousVolume(volume);
          }
          setVolume(volume === 0 ? previousVolume : 0); // Toggle volume based on previousVolume
        };


     const formatDuration = (seconds) => {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = Math.floor(seconds % 60); // Use Math.floor to round down
          return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Pad seconds with 0
        };

     
        useEffect(() => {
          // Reset state variables whenever videos prop changes
          setDuration(0);
          setCurrentTime(0);
          setIsPlaying(false);
          setVolume(1);
        }, [videos]);


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
                                      onDuration={handleDuration}
                                      onProgress={handleProgress}
                                      playing={isPlaying}
                                      muted={volume === 0}
                                      volume={volume}
                                      />

                                      <div className="controls-wrapper">
                                        <h2 className="controls-title">{video.title}</h2>
                                        <div className="controls-middle">
                                             <img src={isPlaying ? pauseBtn : playBtn} className="playBtnMid" onClick={handlePlayPause} />
                                        </div>
                                        <div className="controls-bottom">
                                             <input type="range" 
                                             min={0} 
                                             max={duration} 
                                             value={currentTime}
                                             className="duration-range"
                                             />
                                             <div className="controls-bottom2">
                                                  <img src={isPlaying ? pauseBtn : playBtn } className="bottomBtns" onClick={handlePlayPause} />
                                                  <div>
                                                       <img src={volume === 0 ? mutez : soundz} className="bottomBtns" onClick={handleVolumeToggle} />
                                                       <input 
                                                       type="range" 
                                                       min={0} 
                                                       max={100}
                                                       value={volume * 100}
                                                       onChange={handleVolumeChange}
                                                       className="volume-range"
                                                       />
                                                       <div className="time-duration">
                                                            <span className="time-duration-current">{formatDuration(currentTime)}</span>
                                                            &nbsp;/&nbsp;
                                                            <span  className="time-duration-total">{formatDuration(duration)}</span>
                                                       </div>
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