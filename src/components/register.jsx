import React from 'react';
import Joi from 'joi-browser'; // instead of { Joi }
import Form from './common/form';

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


    doSubmit = () => {
        // Call the server 
        console.log("Registered! ")
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