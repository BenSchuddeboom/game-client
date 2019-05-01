import io from 'socket.io-client'

export function fireBall(player, self, ball, socket) {
    console.log('ball fired', player.x, player.y)

    const mouseX = self.input.mousePointer.x
    const mouseY = self.input.mousePointer.y

    self.balls.create(player.x, player.y, ball)
        .setDisplaySize(50, 50)
        .setOrigin(0,0)
        .setBounce(0.7)

    socket.emit('ballCreated', {
        
    })

    self.balls.getChildren().forEach(ball => {
        ball.setCollideWorldBounds(true)
    })
}