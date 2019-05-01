import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Scene from './Scene'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 600,
  scene: [Scene],
  physics: {
      default: 'arcade',
      arcade: {
          debug: false,
          gravity: { y: 1500 }
      }
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
