import Phaser from "phaser";
import io from 'socket.io-client'
import {addOtherPlayers, addPlayer} from './playerFunctions'

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene' })
    }

    preload() {
        this.load.image('background', './src/assets/finalNight.PNG')
        this.load.image('platform', './src/assets/platform.png')
        this.load.image('player', './src/assets/pokeball.png')
        this.load.image('ball', './src/assets/ball.png')
    }

    create() {
        const self = this

        this.add.image(0, 0, 'background')
            .setOrigin(0,0)
            .setDisplaySize(2000, 1500)
        
        this.physics.world.setBounds(0, 0, 2000, 1500, true, true, true, true)

        this.platforms = this.physics.add.staticGroup()

        this.otherPlayers= this.physics.add.group()

        this.platforms.create(150, 300, 'platform').setOrigin(0, 0).setScale(0.35).refreshBody()
        this.platforms.create(1050, 300, 'platform').setOrigin(1, 0).setScale(0.35).refreshBody()

        this.socket = io.connect('172.16.30.249:4000') //172.16.30.249 -- Albert
        this.socket.on('currentPlayers', (players) => {
            Object.keys(players).forEach(id => {
                if(id === self.socket.id) {
                    addPlayer(self, players[id], 'player')     
                } else {
                    addOtherPlayers(self, players[id], 'player');
                }
            })
        })

        this.socket.on('newPlayer', (playerData) => {
            addOtherPlayers(self, playerData, 'player')
        })

        this.socket.on('disconnect', (playerId) => {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        })

        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        this.socket.on('spawnCookie', (cookieLocation) => {
            if (self.cookie) self.cookie.destroy();
            self.cookie = self.physics.add.image(cookieLocation.x, cookieLocation.y, 'ball');
            self.physics.add.collider(self.player, self.cookie, () => {
                self.socket.emit('cookieCollected');
            }, null, self);
        });

        this.cameras.main.setSize(1000, 800)
        this.cameras.main.setZoom(1.5)
        this.cameras.main.setDeadzone(2000, 1500)

        
    }

    update() {
        const self = this

        this.cursors = this.input.keyboard.createCursorKeys()

        if (this.player) {
            if (this.cursors.left.isDown) {
                this.player.setAngularVelocity(-150);
            } else if (this.cursors.right.isDown) {
                this.player.setAngularVelocity(150);
            } else {
                this.player.setAngularVelocity(0);
            }
            
            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.player.rotation + 1.5, 100, this.player.body.acceleration);
            } else {
                this.player.setAcceleration(0);
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

            this.physics.add.collider(this.player, this.platforms)

            this.cameras.main.startFollow(this.player)
        }
    }

}