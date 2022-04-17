import React from 'react';


const ListGroup = (props) => {
    const { genres, textProperty, valueProperty, onGenreSelect, selectedGenre} = props;
 
    return <ul className="list-group">
    {genres.map(genre => 
        <li 
        className= {selectedGenre===genre ? 'clickable list-group-item active' : 'clickable list-group-item'}
        key={genre[valueProperty]}
        onClick={() => onGenreSelect(genre)}>
           {genre[textProperty]}
        </li>
        )}
  </ul>;
}

// set the props to default value so we don't need pass in everytime.
ListGroup.defaultProps = {
    textProperty: "name", 
    valueProperty: "_id",
}


export default ListGroup;

