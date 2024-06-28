import ReactPlayer from 'react-player';
import Spinner from './Spinner.js';
import Loader from './Loader.js';
import '../assets/css/partial-css/video.css';
import playBtn from '../assets/images/play.png';
import pauseBtn from '../assets/images/pause.png';
import soundz from '../assets/images/soundz.png';
import replayz from '../assets/images/replay.png';
import mutez from '../assets/images/muted.png';
import fullscreen from '../assets/images/fullscreen.png';
import exitfs from '../assets/images/exitfs.png';
import { useState, useEffect, useRef } from 'react';
import screenfull from 'screenfull';


const VideosComponent = ({videos, isLoading}) => {
     const [duration, setDuration] = useState(0);
     const [currentTime, setCurrentTime] = useState(0);
     const [isPlaying, setIsPlaying] = useState(false);
     const [volume, setVolume] = useState(1);
     const [previousVolume, setPreviousVolume] = useState(1);
     const [isFullscreen, setIsFullscreen] = useState(false);
     const [played, setPlayed] = useState(0);
     const [seekValue, setSeekValue] = useState(0)
     const playerRef = useRef(null);
     const [isSeeking, setIsSeeking] = useState(false);
     const controlsRef = useRef(null);
     const timeoutRef = useRef(null);
     const [isVisible, setIsVisible] = useState(true);
     const [isEnded, setIsEnded] = useState(false);
     const [isBuffering, setIsBuffering] = useState(false);
     
     
     const handlePlayPause = () => {
          setIsPlaying(!isPlaying);
          
     }
     const handleMouseMove = () => {
          if (!isVisible) {
            setIsVisible(true);
          } else {

            // Determine device type (consider advanced techniques for accuracy)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            const timeoutDuration = isMobile ? 500 : 2000; // 0.5 seconds for mobile, 3 seconds for desktop

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsVisible(false), timeoutDuration);
          }
        }
  
        useEffect(() => {
          if(document.querySelector('.video-wrapper')){
            document.querySelector('.video-wrapper').addEventListener('mousemove', handleMouseMove);
          }

          return () => {
            if(document.querySelector('.video-wrapper')){
              document.querySelector('.video-wrapper').removeEventListener('mousemove', handleMouseMove);
            } 
          } 
        }, []);
    
   
  
     const handleVideoEnded = () => {
        setIsPlaying(false);
        setIsEnded(true);

     }

     const handleStartReplay = () => {
        playerRef.current.seekTo(0);
        setSeekValue(0);
        setIsPlaying(true);
        setIsEnded(false);
     }
     
     const handleDuration = (newDuration) => {
          // Check if newDuration is a valid number
          if (typeof newDuration === 'number' && !isNaN(newDuration)) {
            setDuration(newDuration);
            
          } else {
            console.error('Invalid duration received');
          }
        };
        const handleSeekChange = (event) => {
          const newPercentage = parseFloat(event.target.value) / 100;
          const maxSeekValue = Math.min(newPercentage, played); // Limit seekValue to current played position
          setSeekValue(maxSeekValue);
        };


        const handleSeekMouseDown = () => {
          setIsSeeking(true); // Set seeking state on mousedown
        };
        const handleSeekMouseUp = () => {

          if (seekValue < played){
               const newTime = seekValue * duration;
               setPlayed(seekValue); // Update played state after dragging
               playerRef.current.seekTo(newTime, 'seconds'); // Seek to the new time
               setIsSeeking(false); // Reset seeking state on mouseup
          }
        };

        const handleSeekTouchStart = (event) => {
          setIsSeeking(true); // Set seeking state on touch start (optional)
        };
        
        const handleSeekTouchEnd = (event) => {
          const newPercentage = parseFloat(event.target.value) / 100;
          const newTime = newPercentage * duration;
          setPlayed(newPercentage); // Update played state after dragging (optional for mobile)
          playerRef.current.seekTo(newTime, 'seconds'); // Seek to the new time
          setIsSeeking(false); // Reset seeking state on touch end
        };
     const handleProgress = (progress) => {
          /* console.log(progress) */
          if (!progress.played) return; // Skip updates if progress info is unavailable

          const newCurrentTime = progress.played * duration;
          setCurrentTime(newCurrentTime);

          const newPlayed = Math.max(seekValue, progress.played);

          setPlayed(newPlayed);
          setSeekValue(newPlayed)
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
        }

     const formatDuration = (seconds) => {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = Math.floor(seconds % 60); // Use Math.floor to round down
          return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Pad seconds with 0
        }

        
     const handleFullscreen = () => {
          if (screenfull.isEnabled) {
            const playerContainer = document.querySelector('.video-wrapper');
            if (screenfull.isFullscreen) {
              screenfull.exit();
            } else {
              screenfull.request(playerContainer);
            }
            setIsFullscreen(!isFullscreen)
          } else {
            alert('Fullscreen not supported by this browser');
          }
     }

        useEffect(() => {
          // Reset state variables whenever videos prop changes
          setDuration(0);
          setCurrentTime(0);
          setIsPlaying(false);
          setVolume(1);
          setPlayed(0);
          setSeekValue(0);
          setIsEnded(false);

        }, [videos]);


        if(isLoading){
          return <Spinner />
     }
     

     return(
          <div className="videos-component-container" >
               {
                    videos.map(video => (
                              <div key={video._id}>
                                   <div className="video-wrapper" onMouseMove={handleMouseMove}>
                                      <ReactPlayer  
                                      ref={playerRef}
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
                                      onEnded={handleVideoEnded}
                                      onBuffer={() => setIsBuffering(true)}
                                      onBufferEnd={() => setIsBuffering(false)}
                                      />

                                      { isBuffering && 
                                      
                                        <div className="loader-container">
                                            <Loader />
                                        </div>
                                      
                                      }

     {isVisible &&
                                      <div 
                                      className="controls-wrapper"
                                      ref={controlsRef}
                                      >
                                        <h2 className="controls-title">{video.title}</h2>
                                        <div className="controls-middle">
                                             <img src={
                                              !isEnded ?

                                              (isPlaying ? pauseBtn : playBtn)
                                              :
                                              replayz
                                              
                                              } className="playBtnMid" onClick={!isEnded ? handlePlayPause : handleStartReplay} />
                                        </div>
                                        <div className="controls-bottom">
                                             <input type="range" 
                                             min={0} 
                                             max={100} 
                                             value={seekValue * 100}
                                             onChange={handleSeekChange}
                                             onMouseUp={handleSeekMouseUp}
                                             onMouseDown={handleSeekMouseDown}
                                             className="duration-range"
                                             onTouchStart={handleSeekTouchStart}
                                             onTouchEnd={handleSeekTouchEnd}

                                             />
                                             <div className="controls-bottom2">
                                                  <img src={
                                                    !isEnded ?
                                                      (isPlaying ? pauseBtn : playBtn )
                                                    :
                                                       replayz
                                                    } className="bottomBtns" onClick={!isEnded ? handlePlayPause : handleStartReplay} />
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
                                                  <img src={isFullscreen ? exitfs : fullscreen} className="bottomBtns" onClick={handleFullscreen} />
                                             </div>
                                        </div>
                                      </div>}
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