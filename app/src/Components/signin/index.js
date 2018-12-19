import React, { Component } from 'react';
import FormInput from './../UI/FormFields';
import { validate } from './../UI/misc';

export default class SignIn extends Component {
    state = {
        formError: false,
        formSuccess:'',
        formData: {
            email:{
                element: 'input',
                value:'',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value:'',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(e) {
        const newFormData = { ...this.state.formData } // made a copy of state
        const newElement = { ...newFormData[e.id] } // grab email object

        newElement.value = e.event.target.value;

        let _validData = validate(newElement);

        newElement.valid = _validData[0];
        newElement.validationMessage = _validData[1];

        newFormData[e.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    submitForm(event) {
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid) {
            console.log(dataToSubmit);
        } else {
            this.setState({ formError: true })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{margin:'100px'}}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        
                        <h2>Please Login</h2>

                        <FormInput 
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(e) => this.updateForm(e)}
                        />

                        <FormInput 
                                id={'password'}
                                formData={this.state.formData.password}
                                change={(e) => this.updateForm(e)}
                        />

                        <button onClick={(event) => this.submitForm(event)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
