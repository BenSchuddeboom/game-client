import React from "react";
import Phaser from "phaser";
import Scene from '../Scene'

export default class Game extends React.Component {
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
    }

    shouldComponentUpdate() {
        event.preventDefault()
    }

    render() {
        return <div>
            hoi aardappel
        </div>
    }
}
