import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    // return special cell if it has content, otherwise return regular info.
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path) // lodash get method
    }

    renderKey = (item, column) => item._id + (column.path || column.key)

    // movies: array
    // Like: class 
    // onDelete: function
    // onLike: function 
    render() { 

        const { data, columns } = this.props;
        
        return (
            <tbody>
                {data.map(item => 
                    <tr key={item._id}>
                        {columns.map(column => 
                            <td key={this.renderKey(item, column)}>{this.renderCell(item, column)}</td>)} 
                    </tr>
                )}
            </tbody>
        );
    }
}
 
export default TableBody;