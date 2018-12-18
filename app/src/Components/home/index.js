import React from 'react'
import Featured from './featured/index';
import MatchesHome from './matches';
import MeetPlayers from './meetPlayers';

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured />
            <MatchesHome />
            <MeetPlayers />
        </div>
    )
}

export default Home
