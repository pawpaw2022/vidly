import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({columns, onSort, sortColumn, data }) => {

    return ( 
        <table className='table'>
            <TableHeader 
            columns = {columns}
            onSort = {onSort}
            sortColumn = {sortColumn} 
            />

            <TableBody 
            data = {data}
            columns = {columns}
            />
        </table>
     );
}
 
export default Table;