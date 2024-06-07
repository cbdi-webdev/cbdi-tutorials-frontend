import '../assets/css/partial-css/pagination.css';



function Pagination({
     videosPerPage, 
     totalVideos, 
     paginate,
     handleNextPage,
     handlePreviousPage,
     currentPage
}){

     const pageNumbers = [];

     for(let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++){
          pageNumbers.push(i);
     }

     return(
          <div>
               <ul className="pagination">
                    <li className="page-item-prevnext">
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
                                   <a onClick={() => paginate(number)} href="#" className="page-link">
                                        {number}
                                   </a>
                              </li>
                         ))
                    }
                    <li className="page-item-prevnext">
                         <a 
                         href="#"
                         onClick={handleNextPage}
                         className={`page-link ${currentPage === Math.ceil(totalVideos / videosPerPage) ? 'disabled' : ''}`}
                         >
                              Next
                         </a>
                    </li>
               </ul>
          </div>
     );
}

export default Pagination;