import { useState, useEffect } from "react";
import VideosComponent from "../components/VideosComponent.js";
import Pagination from "../components/Pagination.js";
import "../assets/css/partial-css/video.css";

function Videos() {
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(1);

  useEffect(() => {
    const fetchSteps = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/steps/my-steps`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await result.json();
        if (Array.isArray(data)) {
          setSteps(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSteps();
  }, []);

  // Flatten all videos across steps into a single ordered array
  const allVideos = steps.flatMap((step) => step.videos);

  // Get Current Video
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < Math.ceil(allVideos.length / videosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Build step groups with 1-based page numbers for side panel
  let counter = 0;
  const stepGroups = steps.map((step) => ({
    label: step.label,
    videos: step.videos.map((video) => ({ ...video, pageNumber: ++counter })),
  }));

  return (
    <div className="videos-page-container">
      <VideosComponent videos={currentVideos} isLoading={isLoading} />
      <Pagination
        videosPerPage={videosPerPage}
        totalVideos={allVideos.length}
        paginate={paginate}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        isLoading={isLoading}
      />

      {!isLoading && allVideos.length > 0 && (
        <div className="side-panel">
          <h5>Video Playlist ({currentPage}/{allVideos.length})</h5>
          {stepGroups.map((group) => (
            <div key={group.label} className="side-step-group">
              <p className="side-step-label">{group.label}</p>
              <ul className="side-list">
                {group.videos.map((video) => (
                  <li
                    key={video._id}
                    className={
                      currentPage === video.pageNumber ? "side-item active" : "side-item"
                    }
                    onClick={() => paginate(video.pageNumber)}
                  >
                    {video.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Videos;
