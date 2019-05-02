export function addPlayer(self, playerData, avatar) {
    self.player = self.physics.add.image(playerData.x, playerData.y, avatar)
        .setDisplaySize(75, 75)
        .setOrigin(0.5, 0.5)
        .setDrag(250)
        .setMaxVelocity(800)
    self.player.setCollideWorldBounds(true)
}

export function addOtherPlayer(self, playerData, avatar) {
    self.otherPlayer = self.add.sprite(playerData.x, playerData.y, avatar)
        .setDisplaySize(75, 75)
        .setOrigin(0.5, 0.5)

    self.otherPlayer.playerId = playerData.playerId
}

export function handleJump(player) {
    if(player.body.blocked.down) {
        player.jumping = false
    }

    if(!player.jumping) {
        player.setVelocityY(-800)
        player.jumping = true
    }
}