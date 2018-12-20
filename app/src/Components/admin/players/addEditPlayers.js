import React, { Component } from 'react'

import AdminLayout from './../../../Hoc/AdminLayout';

import FormInput from './../../UI/FormFields';
import { validate } from '../../UI/misc';

import Fileuploader from './../../UI/FileUploader';
import { firebasePlayers, firebase, firebaseDB } from '../../../firebase';


export default class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name:{
                element: 'input',
                value:'',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname:{
                element: 'input',
                value:'',
                config: {
                    label: 'Player last name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number:{
                element: 'input',
                value:'',
                config: {
                    label: 'Player number',
                    name: 'number_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position:{
                element: 'select',
                value:'',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key:"Keeper", value:"Keeper" },
                        { key:"Defence", value:"Defence" },
                        { key:"Midfield", value:"Midfield" },
                        { key:"Striker", value:"Striker" }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: true
            }
        }
    }

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormData = { ...this.state.formData }

        for(let key in newFormData){
            newFormData[key].value = player[key];
            newFormData[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formData: newFormData
        });

    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if(!playerId){
            // add player

            this.setState({
                formType: 'Add Player'
            })

        } else {
            // edit player
            firebaseDB.ref(`players/${playerId}`).once('value')
            .then((snapshot) => {
                const playerData = snapshot.val();

                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then((url) => {
                    this.updateFields(playerData,playerId,'Edit player',url)
                })
            })
        }
    }

    updateForm(e, content = '') {
        const newFormData = { ...this.state.formData } // made a copy of state
        const newElement = { ...newFormData[e.id] } // grab email object

        if(content === ''){
            newElement.value = e.event.target.value;
        } else {
            newElement.value = content;
        }

        let _validData = validate(newElement);

        newElement.valid = _validData[0];
        newElement.validationMessage = _validData[1];

        newFormData[e.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    }

    successForm = (message) => {
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

        if(formIsValid) {
            if(this.state.formType === 'Edit player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(() => {
                    this.successForm('Update correctly');
                }).catch(e => {
                    this.setState({formError: true});
                })
            }else {
                firebasePlayers.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_players');
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })
            }
            
        } else {
            this.setState({ formError: true });
        }
    }

    resetImage = () => {
        const newFormData = { ...this.state.formData } // made a copy of state
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        })
    }

    storeFileName = (filename) => {
        this.updateForm({id: 'image'}, filename);
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <Fileuploader 
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFileName(filename)}
                            />

                            <FormInput 
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormInput 
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormInput 
                                id={'number'}
                                formData={this.state.formData.number}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormInput 
                                id={'position'}
                                formData={this.state.formData.position}
                                change={(e) => this.updateForm(e)}
                            />

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
