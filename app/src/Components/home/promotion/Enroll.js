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

    }

    updateForm = (e) => {
        const newFormData = { ...this.state.formData } // made a copy of state
        const newElement = { ...newFormData[e.id] } // grab email object

        newElement.value = e.event.target.value;

        let _validData = validate(newElement);

        newElement.valid = _validData[0];
        newElement.validationMessage = _validData[1];

        console.log(newFormData);

        newFormData[e.id] = newElement;

        this.setState({
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
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}

export default Enroll;