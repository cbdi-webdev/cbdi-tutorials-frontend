import ReactPlayer from 'react-player';
import tutorial from '../data/tutorial.json';



function Videos(){

     const { videos } = tutorial

     console.log(videos)



     return(
          <div className="Videos-page-container">
               <h1>Videos page</h1>
               
               {
                         videos.map((video, index) => {
                              return <ReactPlayer key={index} url={video.src} controls />
                         }
                    )
               
               }
          </div>
     );
}


export default Videos;