import React, { Component } from 'react';
import  Joi  from 'joi-browser'; // instead of { Joi }
import Input from './input';
import Select from './select';



class Form extends Component {
    state = { 
        data: {},
        errors: {}
    } 

    validate = () => { // validate a form
        const options = { abortEarly: false } 
        const {error} = Joi.validate(this.state.data, this.schema, options); // username from data to val from schema

        if (!error) return null;

        // map each error msg in Joi to errors
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors; 
    }

    validateProperty = ({name, value}) => { // validate a field
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }


    handleSubmit = e => {
        e.preventDefault(); // prevent network request.

        const errors = this.validate();
        this.setState({ errors: errors || {}});  // if no error, use empty {}
        if (errors) return; 
        
        this.doSubmit();
    }


    handleChange = ({currentTarget: input}) => { // currentTarget -> <input /> label
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value; 
        this.setState({ data, errors});
    }

    renderInput = (name, label, type='text',autoFocus=false) => {
        const { data, errors} = this.state;

        return <Input 
            type={type}
            name= {name}
            label= {label}
            value= {data[name]}
            autoFocus= {autoFocus}
            onChange= {this.handleChange}
            error = {errors[name]}
        />
    }

    renderSelect = (name, label, options) =>{


        const { data, errors} = this.state;


        return <Select 
            options={options}
            name= {name}
            label= {label}
            value= {data[name]}
            onChange= {this.handleChange}
            error = {errors[name]}
        />
    }


    renderButton = (text) => {
        
        return <button 
            disabled={this.validate()} // disable the button when invalid
            className="btn btn-primary">{text}
        </button>
    }

}
 
export default Form;