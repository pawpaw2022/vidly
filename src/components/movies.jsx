import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = { 
        movies: [], // initialize empty array
        genres: [],
        pageSize: 4,
        currentPage: 1,
     } 

     // import the data from backend services 
     componentDidMount() {
        const genres = [{name: 'All Genres' }, ...getGenres()]

         this.setState({ movies: getMovies(), genres });
     }

     handleDelete = movie => {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies})
     };
     
     handleLike = movie => {
        const new_movies = [...this.state.movies]
        new_movies[new_movies.indexOf(movie)].liked = !new_movies[new_movies.indexOf(movie)].liked;
        this.setState({new_movies})
     };

     handlePageChange = (page) => {
         this.setState({ currentPage: page });
     }

     handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1});
     }


    render() { 

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, genres,movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre.name === selectedGenre.name)
            : allMovies;

        const movies = paginate(filtered, currentPage, pageSize)

        if (count === 0) return "There are no movies in the database."


         return <React.Fragment>
                <div className="row">

                    <div className="col-2">
                        <ListGroup 
                        genres = {genres}
                        selectedGenre = {this.state.selectedGenre}
                        onGenreSelect={this.handleGenreSelect} />
                    </div>

                    <div className="col">
                    <p>Showing {filtered.length} movies in the database.</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        movies.map(movie =>
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                                </td>
                                <td>
                                    <button onClick={() => this.handleDelete(movie)}
                                        className='btn btn-danger btn-sm'>
                                            Delete
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <Pagination 
                itemCount = {filtered.length} 
                pageSize = {pageSize}
                currentPage = {currentPage}
                onPageChange={this.handlePageChange} />
                    </div>
                </div>

             
         </React.Fragment>
    }


}
 
export default Movies;