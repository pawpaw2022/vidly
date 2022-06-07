import React from 'react';
import  Joi  from 'joi-browser'; // instead of { Joi }
import Form from './common/form';

class LoginForm extends Form { 

    state={
        data: {username: "", password: ""},
        errors: {},
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }


    doSubmit = () => {
        // Call the server 
        console.log("Submitted!")
    }



    render() { 


        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", undefined, true)}
                    {this.renderInput("password", "Password", 'password',false)}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;