import React, { Component } from 'react';


// input: liked: boolean
// output: onClick

const Like = ({liked, onClick}) => {
    let classes = "fa fa-heart";
    if (!liked) classes += "-o"
    return (<i onClick={onClick}
        className={classes + " clickable"}
        />);
}

 
export default Like;
