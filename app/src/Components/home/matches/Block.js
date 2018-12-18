import React, { Component } from 'react'
import { firebaseMatches } from '../../../firebase';
import Tag, { firebaseLooper, reverseArray } from '../../UI/misc';
import MatchesBlock from '../../UI/Matches_Block';
import Slide from 'react-reveal/Slide';

class Blocks extends Component {

    state = {
        matches: []
    }


    componentDidMount() {
        firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
            const matches = firebaseLooper(snapshot);

            this.setState({
                matches: reverseArray(matches)
            })
        })
    }


    showMatches = (matches) => (
        matches ? 
            matches.map((match, i) => (
                <Slide bottom key={i}>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            ))
        :
            <div>
                <Tag    
                    bck="#0e1731" 
                    size="40px" 
                    color="#ffffff"
                >
                    No Matches Found  ;( 
                </Tag>
            </div>
    )

    render() {
        console.log(this.state);
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}
export default Blocks;
