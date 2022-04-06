import React, { Component } from 'react';


// input: liked: boolean
// output: onClick

const Like = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o"
    return (<i onClick={props.onClick}
        style={{cursor: 'pointer'}}
        className={classes} aria-hidden="true" 
        />);
}

 
export default Like;
