import React from 'react';
import Joi from 'joi-browser'; // instead of { Joi }
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

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

    async populateGenres(){
        const { data: genres } = await getGenres();
        this.setState({genres});
    }

    async populateMovies(){
        try{
            const movie_id = this.props.match.params.id;
            if (movie_id === "new") return; 
            const { data:movie } = await getMovie(movie_id);
            const data = {
                _id: movie_id, 
                title: movie.title, 
                genreId: movie.genre._id, 
                numberInStock: movie.numberInStock, 
                dailyRentalRate: movie.dailyRentalRate
            }
            this.setState({data});
        }catch(ex){
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }
    
   
    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovies();
    }
    


    schema = {
        _id: Joi.string(), 
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"), 
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"), 
    }


    doSubmit = async () => {

        await saveMovie(this.state.data)
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