import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [], // initialize empty array
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: {path: "title", order: "asc"}, 
     } 

     // import the data from backend services 
     componentDidMount() {
        const allGenres = {_id: "", name: 'All Genres' }
        const genres = [allGenres, ...getGenres()]

         this.setState({ movies: getMovies(), genres, selectedGenre: allGenres });
     }

     handleDelete = movie => {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies})
     };
     
     handleLike = movie => {
        const new_movies = [...this.state.movies]
        new_movies[new_movies.indexOf(movie)].liked = !new_movies[new_movies.indexOf(movie)].liked;
        this.setState({movies: new_movies})
     };

     handleSort = sortColumn =>{
        this.setState({sortColumn})
     }

     handlePageChange = (page) => {
         this.setState({ currentPage: page });
     }

     handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1});
     }


    render() { 

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, genres, sortColumn, movies: allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre.name === selectedGenre.name)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

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
                
                    <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete} 
                    onSort = {this.handleSort}
                    />

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