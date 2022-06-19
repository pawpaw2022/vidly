import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest}) => {
    return ( 
        <Route 
        {...rest}
        render={props => {
            if (!getCurrentUser()) return <Redirect to={{
                pathname: '/login',
                state: { from: props.location } // pass in an object where it stores the prev location to be redirected.
            }}/>
                return Component ? <Component {...props} /> : render(props)}}/>
     );
}
 
export default ProtectedRoute;