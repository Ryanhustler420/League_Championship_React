import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import FormInput from './../../UI/FormFields';
import { validate } from './../../UI/misc';

class Enroll extends Component {

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
            }
        }
    }

    submitForm = (event) => {
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
            this.setState({formError: true})
        }

    }

    updateForm = (e) => {
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

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormInput 
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(e) => this.updateForm(e)}
                            />

                            { this.state.formError ? <div className="error_label">Something is wrong. try again</div> : null }

                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}

export default Enroll;