import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { paginate } from '../utils/paginate';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = { 
        movies: [], // initialize empty array
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "", 
        selectedGenre: null,
        sortColumn: {path: "title", order: "asc"}, 
     } 

     // import the data from backend services 
     async componentDidMount() {
        const { data: genreData } = await getGenres();
        const allGenres = {_id: "", name: 'All Genres' };
        const genres = [allGenres, ...genreData];

        const { data: movieData } = await getMovies();
         this.setState({ movies: movieData, genres, selectedGenre: allGenres });
     }

     handleDelete = async movie => {
         const originalMovies = this.state.movies;
         const movies = originalMovies.filter(m => m._id !== movie._id);
         this.setState({movies})

         try{ 
            await deleteMovie(movie._id);
            // throw new Error(""); // testing
          }catch (ex){
            if (ex.response && ex.response.status === 404)
              toast.error("This movie has already been deleted.")
            this.setState({ movies: originalMovies });
          }

         
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
        this.setState({ selectedGenre: genre, searchQuery: "",currentPage: 1});
     }

     handleSearch = (query) => {
        // query -> e.currentTarget.value 
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1})
     }

     getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies, searchQuery} = this.state;


        let filtered = allMovies;
        if (searchQuery) // filter by search query
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre.name === selectedGenre.name);


        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
     }

    render() { 

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, genres, sortColumn, searchQuery} = this.state;
        const { totalCount, data: movies} = this.getPageData();
        const { user } = this.props;
        

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

                    {user && <Link 
                    className='btn btn-primary'
                    to={"/movies/new"}
                    style={{ marginBottom: 20 }}
                    >New Movie</Link>}
                    

                    <p>Showing {totalCount} movies in the database.</p>

                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>

                    <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete} 
                    onSort = {this.handleSort}
                    />

                    <Pagination 
                    itemCount = {totalCount} 
                    pageSize = {pageSize}
                    currentPage = {currentPage}
                    onPageChange={this.handlePageChange} />
                </div>
            </div>   
         </React.Fragment>
    }


}
 
export default Movies;