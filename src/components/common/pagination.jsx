import React, { Component } from 'react';
import _ from "lodash" // npm i lodash@4.17.10

const Pagination = (props) => {
    
    const { itemCount, pageSize } = props; // deconstruction
    const pagesCount = Math.ceil( itemCount / pageSize); // round down
    if (pagesCount === 1) return null; // Don't show pagination if only 1 movie
    const pages = _.range(1, pagesCount+1); // pages = [1, 2, 3] 

    // [1,2,3].map()
    return (
        <nav>
        <ul className="pagination">
            {pages.map(page => (
                <li key={page} className="page-item">
                    <a className="page-link">{page}</a>
                </li>
            ))}
        </ul>
        </nav>
    );
}
 
export default Pagination;
