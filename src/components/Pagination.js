import '../assets/css/partial-css/pagination.css';



function Pagination({
     videosPerPage, 
     totalVideos, 
     paginate,
     handleNextPage,
     handlePreviousPage,
     currentPage,
     isLoading
}){

     const pageNumbers = [];

     for(let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++){
          pageNumbers.push(i);
     }

     return(
          <div>
               {
                    !isLoading &&

                    <ul className="pagination">
                    <li className="page-item-prevnext">
                         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                         <a
                         href="#"
                         onClick={handlePreviousPage}
                         className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                         >
                              Previous
                         </a>
                    </li>
                    {
                         pageNumbers.map(number => (
                              <li key={number} className="page-item">
                                   {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                   <a onClick={() => paginate(number)} href="#" className="page-link">
                                        {number}
                                   </a>
                              </li>
                         ))
                    }
                    <li className="page-item-prevnext">
                         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                         <a
                         href="#"
                         onClick={handleNextPage}
                         className={`page-link ${currentPage === Math.ceil(totalVideos / videosPerPage) ? 'disabled' : ''}`}
                         >
                              Next
                         </a>
                    </li>
               </ul>
               
               }
               
          </div>
     );
}

export default Pagination;