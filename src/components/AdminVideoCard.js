import { useState } from 'react';
import '../assets/css/partial-css/adminVideoCard.css';

function AdminVideoCard({ video, onDelete }) {
     const [isDeleting, setIsDeleting] = useState(false);

     const handleDelete = async () => {
          if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
          setIsDeleting(true);
          await onDelete(video._id);
          setIsDeleting(false);
     };

     return (
          <div className="admin-video-card">
               <div className="admin-video-card-info">
                    <div className="admin-video-item">
                         <label>title:</label>
                         <p>{video.title}</p>
                    </div>
                    <div className="admin-video-item">
                         <label>src:</label>
                         <a href={video.src} target="_blank" rel="noreferrer" className="admin-video-link">
                              {video.src.length > 60 ? video.src.slice(0, 60) + '...' : video.src}
                         </a>
                    </div>
                    <div className="admin-video-item">
                         <label>cloudinaryPublicId:</label>
                         <p className="admin-video-pubid">{video.cloudinaryPublicId}</p>
                    </div>
               </div>
               <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="admin-video-delete-btn"
               >
                    {isDeleting ? 'Deleting...' : 'Delete'}
               </button>
          </div>
     );
}

export default AdminVideoCard;
