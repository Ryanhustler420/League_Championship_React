import React, { Component } from 'react'
import AdminLayout from './../../../Hoc/AdminLayout';

import FormInput from './../../UI/FormFields';
import { validate } from '../../UI/misc';


export default class AddEditMatch extends Component {

    state = {
        matchId: '',
        formType:'',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date:{
                element: 'input',
                value:'',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },            
            local:{
                element: 'select',
                value:'',
                config: {
                    label: 'Select a Local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal:{
                element: 'input',
                value:'',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away:{
                element: 'select',
                value:'',
                config: {
                    label: 'Select a Away team',
                    name: 'select_Away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway:{
                element: 'input',
                value:'',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee:{
                element: 'input',
                value:'',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium:{
                element: 'input',
                value:'',
                config: {
                    label: 'Stadium',
                    name: 'Stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result:{
                element: 'select',
                value:'',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: 'W', value: 'W' },
                        { key: 'L', value: 'L' },
                        { key: 'D', value: 'D' },
                        { key: 'n/a', value: 'n/a' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final:{
                element: 'select',
                value:'',
                config: {
                    label: 'Game played ?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' },
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }


    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>

                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormInput 
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(e) => this.updateForm(e)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormInput 
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div>
                                        <FormInput 
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormInput 
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div>
                                        <FormInput 
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="split_fields">
                                <FormInput 
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={(e) => this.updateForm(e)}
                                />

                                <FormInput 
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div className="split_fields last">
                                <FormInput 
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(e) => this.updateForm(e)}
                                />

                                <FormInput 
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(e) => this.updateForm(e)}
                                />

                            </div>

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>

                            {
                                this.state.formError ? 
                                    <div className="error_label">
                                        Something is wrong
                                    </div>
                                : ''
                            }

                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
