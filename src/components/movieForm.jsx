import React from 'react';
import Joi from 'joi-browser'; // instead of { Joi }
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

class MovieForm extends Form { 

    state={
        data: {
            title: "", 
            genreId: "", 
            numberInStock: "", 
            dailyRentalRate: ""
        },
        genres: [],
        errors: {},
    }
   
    componentDidMount() {

        const genres = getGenres();
        this.setState({genres});
        
        const movie_id = this.props.match.params.id;
        if (movie_id === "new") return; 

        const movie = getMovie(movie_id);
        if (!movie) return this.props.history.replace("/not-found");

        const data = {
            _id: movie_id, 
            title: movie.title, 
            genreId: movie.genre._id, 
            numberInStock: movie.numberInStock, 
            dailyRentalRate: movie.dailyRentalRate
        }

        this.setState({data});
    }
    


    schema = {
        _id: Joi.string(), 
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"), 
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"), 
    }


    doSubmit = () => {


        saveMovie(this.state.data);

        // Back to movies page
        this.props.history.push('/movies')
    }



    render() { 

        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title", undefined, false)}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", undefined,false)}
                    {this.renderInput("dailyRentalRate", "Rate", undefined,false)}
                    {this.renderButton("Save")}
                </form>
                
            </div>
        );
    }

    
    
}
 
export default MovieForm;