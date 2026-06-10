import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AdminVideoCard from '../components/AdminVideoCard.js';
import Spinner from '../components/Spinner.js';
import AlertContext from '../utilities/AlertContext.js';
import '../assets/css/partial-css/adminManageVideos.css';
import '../assets/css/partial-css/admin.css';

function AdminManageVideos() {
     const [videos, setVideos] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [title, setTitle] = useState('');
     const [file, setFile] = useState(null);
     const [isUploading, setIsUploading] = useState(false);
     const { notifysuccess, notifyerror } = useContext(AlertContext);

     const fetchVideos = async () => {
          setIsLoading(true);
          try {
               const res = await fetch(`${process.env.REACT_APP_API_URL}/videos`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
               });
               const data = await res.json();
               setVideos(Array.isArray(data) ? data : []);
          } catch {
               notifyerror('Failed to load videos.');
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          fetchVideos();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     const handleUpload = async (e) => {
          e.preventDefault();
          if (!file) return notifyerror('Please select a video file.');
          if (!title.trim()) return notifyerror('Please enter a title.');

          const allowed = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
          if (!allowed.includes(file.type)) return notifyerror('Only mp4, mov, avi, and webm files are allowed.');
          if (file.size > 500 * 1024 * 1024) return notifyerror('File must be under 500MB.');

          setIsUploading(true);
          try {
               const formData = new FormData();
               formData.append('video', file);
               formData.append('title', title.trim());

               const res = await fetch(`${process.env.REACT_APP_API_URL}/videos`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    body: formData,
               });

               if (res.ok) {
                    notifysuccess('Video uploaded successfully.');
                    setTitle('');
                    setFile(null);
                    e.target.reset();
                    await fetchVideos();
               } else {
                    const message = await res.json();
                    notifyerror(message || 'Upload failed.');
               }
          } catch {
               notifyerror('An unexpected error occurred.');
          } finally {
               setIsUploading(false);
          }
     };

     const handleDelete = async (id) => {
          try {
               const res = await fetch(`${process.env.REACT_APP_API_URL}/videos/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
               });
               if (res.ok) {
                    notifysuccess('Video deleted.');
                    setVideos((prev) => prev.filter((v) => v._id !== id));
               } else {
                    const message = await res.json();
                    notifyerror(message || 'Failed to delete video.');
               }
          } catch {
               notifyerror('An unexpected error occurred.');
          }
     };

     return (
          <div className="admin-manage-videos-container">
               <div className="admin-upflex">
                    <h1 className="admin-title">Manage Videos</h1>
                    <Link to="/admin"><span>BACK TO DASHBOARD &lt;&lt;</span></Link>
               </div>

               <div className="admin-dashboard">
                    <section className="video-upload-section">
                         <h2 className="section-heading">Upload New Video</h2>
                         <form onSubmit={handleUpload} className="video-upload-form">
                              <div className="upload-field">
                                   <label htmlFor="video-title">Title</label>
                                   <input
                                        id="video-title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter video title"
                                        className="upload-input"
                                   />
                              </div>
                              <div className="upload-field">
                                   <label htmlFor="video-file">Video File</label>
                                   <input
                                        id="video-file"
                                        type="file"
                                        accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                                        onChange={(e) => setFile(e.target.files[0] || null)}
                                        className="upload-input upload-file-input"
                                   />
                                   <span className="upload-hint">Accepted: mp4, mov, avi, webm — max 500MB</span>
                              </div>
                              <button type="submit" disabled={isUploading} className="upload-submit-btn">
                                   {isUploading ? 'Uploading...' : 'Upload Video'}
                              </button>
                         </form>
                    </section>

                    <section className="video-list-section">
                         <h2 className="section-heading">All Videos ({videos.length})</h2>
                         {isLoading ? (
                              <div className="spinna-container">
                                   <Spinner />
                              </div>
                         ) : videos.length === 0 ? (
                              <p className="no-videos-msg">No videos uploaded yet.</p>
                         ) : (
                              <div className="admin-video-list">
                                   {videos.map((video) => (
                                        <AdminVideoCard key={video._id} video={video} onDelete={handleDelete} />
                                   ))}
                              </div>
                         )}
                    </section>
               </div>
          </div>
     );
}

export default AdminManageVideos;
