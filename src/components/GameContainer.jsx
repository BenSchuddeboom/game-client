import React, { Component } from 'react'
import { connect } from 'react-redux';
import Leaderboard from './Leaderboard.jsx'
import Game from './Game.jsx'

class GameContainer extends Component {
  render() {
    return (
        <>
            <Game />
            <Leaderboard leaderboard={this.props.leaderboard}/>
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
