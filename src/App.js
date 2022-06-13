import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/register';



class App extends Component { 
  render() { 
    return (
      <React.Fragment>
        <ToastContainer />
        <main className='container'>
        <NavBar />
          <Switch>
            <Route path="/new" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={Register} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;


