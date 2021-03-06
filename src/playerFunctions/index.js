export function addPlayer(self, playerData, avatar) {
    self.player = self.physics.add.image(playerData.x, playerData.y, avatar)
        .setDisplaySize(50, 50)
        .setOrigin(0.5, 0.5)
        .setDrag(250)
        .setMaxVelocity(800)
    self.player.setCollideWorldBounds(true)
}

export function addOtherPlayers(self, playerData, avatar) {
    const otherPlayer = self.add.sprite(playerData.x, playerData.y, avatar)
        .setDisplaySize(50, 50)
        .setOrigin(0.5, 0.5)
    otherPlayer.playerId = playerData.playerId
    self.otherPlayers.add(otherPlayer)
}