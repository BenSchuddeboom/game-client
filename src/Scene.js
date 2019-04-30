import Phaser from "phaser";
import io from 'socket.io-client'

export default class Scene extends Phaser.Scene {
    constructor() {
        super({key: 'Scene' })
    }

    preload() {
        this.load.image('logo', './src/assets/logo.png')
    }

    create() {
        const self = this
        this.socket = io.connect('localhost:4000')
        this.socket.on('currentPlayers', (players) => {
            Object.keys(players).forEach(id => {
                if(id === this.socket.id) {
                    this.addPlayer(players[id])     
                } else {
                    this.addOtherPlayer(players[id])
                }
            })
        })
        this.socket.on('newPlayer', (player) => {
            this.addOtherPlayer(player)
        })
        this.socket.on('disconnect', (playerId) => {
            if(playerId === self.otherPlayer.playerId) {
                self.otherPlayer.destroy()
            }
        })

        this.socket.on('playerMoved', (player) => {
            if (player.playerId === self.otherPlayer.playerId) {
                self.otherPlayer.setPosition(player.x, player.y);
            }
        })
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys()
        if (this.logo) {
            if (this.cursors.left.isDown) {
                this.logo.x--
            } else if (this.cursors.right.isDown) {
                this.logo.x++
            } else if(this.cursors.up.isDown) {
                this.logo.y--
            } else if(this.cursors.down.isDown) {
                this.logo.y++
            }
            
            this.physics.world.wrap(this.logo, 5);

            const x = this.logo.x;
            const y = this.logo.y;
            if (this.logo.oldPosition && (x !== this.logo.oldPosition.x || y !== this.logo.oldPosition.y)) {
                this.socket.emit('playerMovement', {
                    x: this.logo.x, 
                    y: this.logo.y
                });
            }
     
            this.logo.oldPosition = {
                x: this.logo.x,
                y: this.logo.y
            };
        }
    }

    addPlayer(player) {
        this.logo = this.physics.add.image(player.x, player.y, 'logo')
            .setDisplaySize(75, 75)
            .setOrigin(0.5, 0.5)
    }

    addOtherPlayer(player) {
        this.otherPlayer = this.add.sprite(player.x, player.y, 'logo')
            .setDisplaySize(75, 75)
            .setOrigin(0.5, 0.5)

        this.otherPlayer.playerId = player.playerId
    }

}