export default function renderScreen(screen, game, requestAnimationFrame, playerId){
    const context = screen.getContext("2d")
    
    context.clearRect(0, 0, screen.width, screen.height);  

    for (const playerId in game.state.players) {

        const player = game.state.players[playerId];
        context.fillStyle = "#969696";
        context.fillRect(player.x, player.y, 1, 1);            
    }

    for (const fruitId in game.state.fruits) {

        const fruit = game.state.fruits[fruitId];
        context.fillStyle = "#64B857";
        context.fillRect(fruit.x, fruit.y, 1, 1);            
    }

    const currentPlayer = game.state.players[playerId]

    if (currentPlayer) {
        context.fillStyle = "#F0DB4F"
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, playerId)
    })
}