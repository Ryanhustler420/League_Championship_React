import React, { Component } from 'react'

export default class MatchesList extends Component {

    state = {
        matchesList: []
    }

    static getDerivedStateFromProps(props, state){
        return state = {
            matchesList: props.matches
        }
    }

    render() {
        return (
            <div>
                List
            </div>
        )
    }
}
