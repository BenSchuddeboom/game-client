import React, { Component } from 'react'
import './main.css'

export default class Leaderboard extends Component {
  render() {
      this.props.leaderboard ? console.log('leaderboard props:', this.props.leaderboard) : console.log('loading')
    return (
        <div id="leaderboard-container">
        <table id="leaderboard-table">
            <tr>
                <th>Player</th>
                <th>Score</th>
            </tr>
           {this.props.leaderboard.map(player => 
                <tr>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                </tr>
           )}
        </table>
    </div>

    )
  }
}
