import Phaser from "phaser";
import io from 'socket.io-client'
import {addOtherPlayer, addPlayer, handleJump} from './playerFunctions'
import {fireBall, updateOtherBalls} from './ballFunctions'

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene' })
    }

    preload() {
        this.load.image('background', './src/assets/finalNight.PNG')
        this.load.image('platform', './src/assets/platform.png')
        this.load.image('player', './src/assets/logo.png')
        this.load.image('ball', './src/assets/ball.png')
    }

    create() {
        const self = this

        this.add.image(0, 0, 'background')
            .setOrigin(0,0)
            .setDisplaySize(1200, 800)

        this.platforms = this.physics.add.staticGroup()
        this.balls = this.physics.add.group()
        this.otherBalls = this.physics.add.group()

        this.platforms.create(150, 300, 'platform').setOrigin(0, 0).setScale(0.35).refreshBody()
        this.platforms.create(1050, 300, 'platform').setOrigin(1, 0).setScale(0.35).refreshBody()

        this.socket = io.connect('172.16.30.249:4000') //172.16.30.249 -- Albert
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
            updateOtherBalls(balls, self)
        })
        
        let angle = 0
        this.input.on('pointermove', (event) => {
            angle = Phaser.Math.Angle.Between(self.player.x, self.player.y, event.x, event.y)
        }, this)

        this.ballFired = false
        this.input.on('pointerdown', () => {
            fireBall(this.player, self, 'ball', angle)
        }, this)
    }

    update() {
        const self = this

        this.cursors = this.input.keyboard.createCursorKeys()

        if (this.player) {
            if (this.cursors.left.isDown) {
                this.player.setAccelerationX(-800)
            } else if (this.cursors.right.isDown) {
                this.player.setAccelerationX(800)
            } else {
                this.player.setAccelerationX(0)
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

            this.physics.add.collider(this.player, this.platforms)
            this.physics.add.collider(this.balls, this.platforms)
            this.physics.add.collider(this.balls)
        }
    }

}