import Phaser from "phaser";
import io from 'socket.io-client'
import {addOtherPlayer, addPlayer, handleJump} from './playerFunctions'
import {fireBall} from './ballFunctions'

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene' })
    }

    preload() {
        this.load.image('background', './src/assets/finalNight.PNG')
        this.load.image('player', './src/assets/logo.png')
        this.load.image('ball', './src/assets/ball.png')
    }

    create() {
        const self = this
        
        this.add.image(0, 0, 'background')
            .setOrigin(0,0)
            .setDisplaySize(1200, 600)
        
        this.balls = this.physics.add.group()

        this.otherBalls = this.physics.add.group()

        this.socket = io.connect('172.16.30.249:4000')
        this.socket.on('currentPlayers', (players) => {
            Object.keys(players).forEach(id => {
                if(id === this.socket.id) {
                    addPlayer(self, players[id], 'player')     
                } else {
                    addOtherPlayer(self, players[id], 'player')
                }
            })
        })

        this.socket.on('newPlayer', (playerData) => {
            addOtherPlayer(self, playerData, 'player')
        })

        this.socket.on('disconnect', (playerId) => {
            if(playerId === self.otherPlayer.playerId) {
                self.otherPlayer.destroy()
            }
        })

        this.socket.on('playerMoved', (playerData) => {
            if(playerData.playerId === self.otherPlayer.playerId) {
                self.otherPlayer.setPosition(playerData.x, playerData.y);
            }
        })

        this.socket.on('updateOtherBalls', (balls) => {
            console.log('triggered', balls)
            balls.map((ball, index) => {
                if(!self.otherBalls.getChildren()[index]) {
                    self.otherBalls.create(ball.x, ball.y, 'ball')
                        .setDisplaySize(50, 50)
                        .setOrigin(0,0)
                        .setBounce(0.7)
                    self.otherBalls.getChildren().forEach(ball => {
                        ball.setCollideWorldBounds(true)
                    })        
                } else {
                    self.otherBalls.getChildren()[index].x = ball.x
                    self.otherBalls.getChildren()[index].y = ball.y
                }
            })
        })

        this.input.on('pointerdown', () => {
            fireBall(this.player, self, 'ball', this.socket)
        }, this)
    }

    update() {
        const self = this

        this.cursors = this.input.keyboard.createCursorKeys()

        if (this.player) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-260)
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(260)
            } else {
                this.player.setVelocityX(0)
            }

            if(this.cursors.up.isDown) {
                handleJump(this.player)
            }

            const x = this.player.x;
            const y = this.player.y;

            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
                this.socket.emit('playerMovement', {
                    x: this.player.x, 
                    y: this.player.y
                })
            }

            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y
            }
            
            self.balls.getChildren().forEach(ball => {
                const x = ball.x
                const y = ball.y

                if (ball.oldPosition && (x !== ball.oldPosition.x || y !== ball.oldPosition.y)) {
                    this.socket.emit('ballMovement', {
                        balls: self.balls.getChildren()
                    })
                }
        
                ball.oldPosition = {
                    x: ball.x,
                    y: ball.y
                }
            })
        }
    }

}