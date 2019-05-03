import React from "react";
import Phaser from "phaser";
import Scene from '../Scene'
import './Game.css'
import {connect} from 'react-redux'
import user from "../reducers/user";

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
    };
        
        const game = new Phaser.Game(config);

        setTimeout(() => {
            const socket = game.scene.game.scene.scenes[0].socket
            socket.emit("username", {
                username: this.props.username
            })
        }, 2000)


    }

    shouldComponentUpdate() {
        event.preventDefault()
    }

    render() {
        return <></>
    }
}

const mapStateToProps = state => {
    return {
        username: state.user
    }
}

export default connect(mapStateToProps)(Game)