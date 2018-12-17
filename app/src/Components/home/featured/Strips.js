import React, { Component } from 'react'
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends Component {

    showStripes = () => {
        return (
            <p>Stripes</p>
        )
    } 

    render() {
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        )
    }
}

export default Stripes;