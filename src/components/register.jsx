import React from 'react';
import Joi from 'joi-browser'; // instead of { Joi }
import Form from './common/form';
import { register } from '../services/userService';
import auth from "../services/authService";

class Register extends Form { 

    state={
        data: {username: "", password: "", name: ""},
        errors: {},
    }

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(5).required().label("Password"), 
        name: Joi.string().required().label("Name"), 
    }


    doSubmit = async () => {
        // Call the server 
        try{
           const response = await register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            // this.props.history.push("/");
            window.location = "/"; // get the full reload of the page
        }catch (ex) {
            if (ex.response && ex.response.status === 400) { // already registered
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    }



    render() { 


        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", undefined, true)}
                    {this.renderInput("password", "Password", 'password',false)}
                    {this.renderInput("name", "Name", undefined,false)}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default Register;