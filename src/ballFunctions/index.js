export function fireBall(player, self, ball, angle) {

    if(!self.ballFired) {
        self.ballFired = true

        const yVector = Math.sin(angle)
        const xVector = Math.cos(angle)

        self.balls.create(player.x, player.y, ball)
            .setDisplaySize(30, 30)
            .setOrigin(0, 0)
            .setBounce(0.7)
            .setVelocityX(1500*xVector)
            .setVelocityY(1500*yVector)

        self.balls.getChildren().forEach(ball => {
            ball.setCollideWorldBounds(true)
            setTimeout(() => {
                ball.destroy()
                self.ballFired = false
            }, 2000)
        })
    }
}

export function updateOtherBalls(balls, self) {
    return balls.map((ball, index) => {
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
}