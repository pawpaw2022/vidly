import React, {Component} from 'react';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
import Like from "./common/like";

class MoviesTable extends Component {

    columns = [
        { path: "title", label: "Title"},
        { path: "genre.name", label: "Genre"},
        { path: "numberInStock", label: "Stock"},
        { path: "dailyRentalRate", label: "Rate"},
        { key: "like", 
        content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>},
        { key: "delete", 
        content: movie =>
        <button 
        onClick={() => this.props.onDelete(movie)}
        className='btn btn-danger btn-sm'>
        Delete
        </button>},
    ]
    
    render() { 
        const { movies, onDelete, onLike, onSort, sortColumn} = this.props;
        return (<table className='table'>

            <TableHeader 
            columns = {this.columns}
            onSort = {onSort}
            sortColumn = {sortColumn} />

            <TableBody 
            data = {movies}
            columns = {this.columns}
            onDelete = {onDelete}
            onLike = {onLike}/>
            
        </table>


        );
    }
}
 
 
export default MoviesTable;