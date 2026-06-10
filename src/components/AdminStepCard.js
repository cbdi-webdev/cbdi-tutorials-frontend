import { useState } from 'react';
import '../assets/css/partial-css/adminStepCard.css';

function AdminStepCard({ step, allVideos, onUpdate, onDelete, onAddVideo, onRemoveVideo }) {
     const [name, setName] = useState(step.name);
     const [label, setLabel] = useState(step.label);
     const [order, setOrder] = useState(step.order);
     const [isSaving, setIsSaving] = useState(false);
     const [isDeleting, setIsDeleting] = useState(false);
     const [selectedVideoId, setSelectedVideoId] = useState('');
     const [isAddingVideo, setIsAddingVideo] = useState(false);

     const assignedIds = new Set(step.videos.map((v) => v._id));
     const availableVideos = allVideos.filter((v) => !assignedIds.has(v._id));

     const handleSave = async () => {
          setIsSaving(true);
          await onUpdate(step._id, { name: name.trim(), label: label.trim(), order: Number(order) });
          setIsSaving(false);
     };

     const handleDelete = async () => {
          if (!window.confirm(`Delete step "${step.label}"? This cannot be undone.`)) return;
          setIsDeleting(true);
          await onDelete(step._id);
     };

     const handleAddVideo = async () => {
          if (!selectedVideoId) return;
          setIsAddingVideo(true);
          await onAddVideo(step._id, selectedVideoId);
          setSelectedVideoId('');
          setIsAddingVideo(false);
     };

     return (
          <div className="admin-step-card">
               <div className="step-card-header">
                    <span className="step-financing-badge">{step.financingType}</span>
                    <button
                         onClick={handleDelete}
                         disabled={isDeleting}
                         className="step-delete-btn"
                    >
                         {isDeleting ? 'Deleting...' : 'Delete Step'}
                    </button>
               </div>

               <div className="step-card-fields">
                    <div className="step-field">
                         <label>name:</label>
                         <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="step-field-input"
                         />
                    </div>
                    <div className="step-field">
                         <label>label:</label>
                         <input
                              type="text"
                              value={label}
                              onChange={(e) => setLabel(e.target.value)}
                              className="step-field-input"
                         />
                    </div>
                    <div className="step-field step-field--sm">
                         <label>order:</label>
                         <input
                              type="number"
                              value={order}
                              onChange={(e) => setOrder(e.target.value)}
                              className="step-field-input"
                              min="0"
                         />
                    </div>
                    <button onClick={handleSave} disabled={isSaving} className="step-save-btn">
                         {isSaving ? 'Saving...' : 'Save'}
                    </button>
               </div>

               <div className="step-videos-section">
                    <p className="step-videos-label">Videos ({step.videos.length}):</p>
                    {step.videos.length === 0 ? (
                         <p className="step-no-videos">No videos assigned.</p>
                    ) : (
                         <ul className="step-video-list">
                              {step.videos.map((v) => (
                                   <li key={v._id} className="step-video-item">
                                        <span>{v.title}</span>
                                        <button
                                             onClick={() => onRemoveVideo(step._id, v._id)}
                                             className="step-video-remove-btn"
                                        >
                                             Remove
                                        </button>
                                   </li>
                              ))}
                         </ul>
                    )}

                    {availableVideos.length > 0 && (
                         <div className="step-add-video">
                              <select
                                   value={selectedVideoId}
                                   onChange={(e) => setSelectedVideoId(e.target.value)}
                                   className="step-video-select"
                              >
                                   <option value="">— select video to add —</option>
                                   {availableVideos.map((v) => (
                                        <option key={v._id} value={v._id}>{v.title}</option>
                                   ))}
                              </select>
                              <button
                                   onClick={handleAddVideo}
                                   disabled={!selectedVideoId || isAddingVideo}
                                   className="step-add-video-btn"
                              >
                                   {isAddingVideo ? 'Adding...' : 'Add Video'}
                              </button>
                         </div>
                    )}
               </div>
          </div>
     );
}

export default AdminStepCard;
