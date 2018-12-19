import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './../../../Hoc/AdminLayout';

import { 
        Table, 
        TableBody, 
        TableCell, 
        TableHead, 
        TableRow, 
        Paper, 
        CircularProgress
    } from '@material-ui/core';
    
import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../UI/misc';

export default class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value').then((snapshot) => {
            const players = firebaseLooper(snapshot);

            this.setState({
                isLoading: false,
                players: reverseArray(players)
            })

        }).catch((err) => {
            
        });
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First name</TableCell>
                                    <TableCell>Last name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.players ?
                                    this.state.players.map((player, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link to={`/admin_players/add_players/${player.id}`}>
                                                    {player.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {player.lastname}
                                            </TableCell>
                                            <TableCell>
                                                {player.number}
                                            </TableCell>
                                            <TableCell>
                                                {player.position}
                                            </TableCell>
                                        </TableRow>

                                    ))
                                :
                                    null
                                }
                            </TableBody>
                        </Table>
                    </Paper>

                    <div className="admin_progress">
                        {this.state.isLoading ? 
                                <CircularProgress thickness={7} style={{color:'#98c5e9'}}/>
                            :
                                ''
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
