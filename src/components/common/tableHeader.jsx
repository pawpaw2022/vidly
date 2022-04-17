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

    // columns: array
    // onSort: object
    // sortColumn: function
    render() { 
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => 
                        (<th onClick={() => this.raiseSort(column.path)}>{column.label}</th>
                        ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;