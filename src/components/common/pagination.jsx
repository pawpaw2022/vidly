import React from 'react';
import _ from "lodash"; // npm i lodash@4.17.10
import PropTypes from 'prop-types'; // npm i prop-types

const Pagination = ({itemCount, pageSize, currentPage, onPageChange}) => {
    
    const pagesCount = Math.ceil( itemCount / pageSize); // round down
    if (pagesCount === 1) return null; // Don't show pagination if only 1 movie
    const pages = _.range(1, pagesCount+1); // pages = [1, 2, 3] 
    
    

    // [1,2,3].map()
    return (
        <nav>
        <ul className="pagination">
            {pages.map(page => (
                <li key={page} 
                className={page === currentPage ? "clickable page-item active" : "clickable page-item"}> 
                    <a className="page-link"
                        onClick={() => onPageChange(page)}>{page}</a>
                </li>
            ))}
        </ul>
        </nav>
    );
}

// propTypes is used to check the correct type for each props
// it gives a warning on the console if incorrect.
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired, 
};

 
export default Pagination;
