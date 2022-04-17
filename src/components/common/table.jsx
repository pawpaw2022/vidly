import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = (props) => {

    const {columns, onSort, sortColumn, data } = props
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