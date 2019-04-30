import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import io from 'socket.io-client'
import logoImg from './assets/logo.png'

const socket = io.connect('172.16.30.221:4000')

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update
  },
  physics: {
      default: 'arcade',
      arcade: {
          debug: false,
          gravity: { y: 0 }
      }
  }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('logo', logoImg)
}

function create() {

}

function update() {

}

function displayPlayer(self, player) {
    
}

ReactDOM.render(<App />, document.getElementById("root"));
