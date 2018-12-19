import React, { Component } from 'react'
import AdminLayout from './../../../Hoc/AdminLayout';

import FormInput from './../../UI/FormFields';
import { validate, firebaseLooper } from '../../UI/misc';

import { firebaseMatches, firebaseTeams, firebaseDB } from '../../../firebase';

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


    updateFields(match, teamOptions, teams, type, matchId) {
        const newFormData =  {
            ...this.state.formData
        }

        for(let key in newFormData) {
            if(match){
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }

            if(key === 'local' || key === 'away'){
                newFormData[key].config.options = teamOptions
            }
        }

        this.setState({
            matchId,
            formType: type,
            formData: newFormData,
            teams
        });

    }

    componentDidMount() {
        const matchId = this.props.match.params.id;
        
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot => {
                const teams = firebaseLooper(snapshot);
                
                const teamOptions = [];
                snapshot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                });
                
                this.updateFields(match, teamOptions, teams, type, matchId);
            })
        }

        if(!matchId) {
            // Add Match
            getTeams(false, 'Add Match')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((snapshot) => {
                const match = snapshot.val();
                getTeams(match, 'Edit Match')
            })
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

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            }); 
        }, 2000);
    }

    submitForm(event) {
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach((team) => {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        if(formIsValid) {
            if(this.state.formType === 'Edit Match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then(() => {
                    this.successForm('Updated correctly');
                }).catch((e) => {
                    this.setState({ formError: true })
                })
            } else {
                firebaseMatches.push(dataToSubmit).then((result) => {
                    this.props.history.push('/admin_matches');
                }).catch((err) => {
                    this.setState({formError: true})
                });
            }

        } else {
            this.setState({ formError: true });
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
