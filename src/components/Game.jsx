import React from "react";
import Phaser from "phaser";
import Scene from '../Scene'
import './Game.css'
import {connect} from 'react-redux'
import {setPlayers} from '../actions/setPlayers'

class Game extends React.Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            parent: "phaser-example",
            width: 800,
            height: 600,
            scene: [Scene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: { y: 0 }
                }
            }
        }
        
        const game = new Phaser.Game(config);
        let socket = null;

        setTimeout(() => {
            socket = game.scene.game.scene.scenes[0].socket
            socket.emit("username", {
                username: this.props.username
            })
            socket.on('setPlayers', (players) => {
                this.props.setPlayers(players)
            })
        }, 500)
    }

    shouldComponentUpdate() {
        event.preventDefault()
    }

    render() {
        return (
            <></>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.user.name,
    }
}

export default connect(mapStateToProps, {setPlayers})(Game)