import React, { Component } from 'react'
import { connect } from 'react-redux';
import Leaderboard from './Leaderboard.jsx'
import Game from './Game.jsx'
import Controls from './Controls.jsx'
import './main.css'

class GameContainer extends Component {
  render() {
    return (
        <>  
            <div id="game">
                <div id="gamediv">
                <Game />
            </div>
                <Leaderboard leaderboard={this.props.leaderboard}/>
            </div>
            <div className="controls">
                <Controls />
            </div>
        </>
    )
  }
}

const mapStateToProps = state => {
    return {
        leaderboard: state.leaderboard
    }
}

export default connect(mapStateToProps)(GameContainer)
