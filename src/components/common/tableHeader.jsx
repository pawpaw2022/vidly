import React, { Component } from 'react';

// move the tableHeader into an individual class so it can be easily reused.
class TableHeader extends Component {

    // change the responsibility to subclass so the sort stays the same 
    raiseSort = path => {
        // change sort order if user click more than once
        const sortColumn = {...this.props.sortColumn}
        if (sortColumn.path === path){
            sortColumn.order = sortColumn.order==="asc" ? "desc" : "asc"
        }
        else{
            sortColumn.path = path
            sortColumn.order = "asc"
        }
        this.props.onSort(sortColumn)
    }

    renderSortIcon = column => {
        const { sortColumn } = this.props
        if ( !column.path || column.path !== sortColumn.path) return null;
        if (sortColumn.order === "asc") return <i className='fa fa-sort-asc'></i>
        return <i className='fa fa-sort-desc'></i>
    }

    // columns: array
    // onSort: object
    // sortColumn: function
    render() { 
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => 
                        (<th key={column.path || column.key} 
                            className= {column.path ?  "clickable" : ""}
                            onClick={column.path ? () => this.raiseSort(column.path) : null}>
                                {column.label}{this.renderSortIcon(column)}
                            </th>
                        ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;