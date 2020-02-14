function createGame() {
    
    const state = { 

        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {

        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;
        
        state.players[playerId] = {
            x: playerX,
            y: playerY
        };
    }

    function removePlayer(command) {

        const playerId = command.playerId;

        delete state.players[playerId];
    }

    function addFruit(command) {
        
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;
        
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };
    }

    function removeFruit(command) {

        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }

    function checkForFruitCollision(player){

        for (const fruitId in state.fruits){

            const fruit = state.fruits[fruitId]

            if (fruit.x == player.x && fruit.y == player.y) {
                console.log("colision")
                removeFruit({fruitId})
            }
        }
    }

    function movePlayer(command){

        const acceptedMoves = {

            ArrowDown(player){

                if (player.y + 1 < state.screen.height) {
                    
                    player.y = player.y + 1
                }
            },
    
            ArrowUp(player){

                if (player.y > 0) {
                    player.y = player.y - 1
                }
            },
    
            ArrowRight(player){

                if (player.x + 1 < state.screen.width) {
                    
                    player.x = player.x + 1
                }
            },
    
            ArrowLeft(player){

                if (player.x > 0) {
                    
                    player.x = player.x - 1
                }
            }
        }

        var move = acceptedMoves[command.keyPressed];
        var player = state.players[command.playerId];

        if(player && move){
            
            move(player);
            checkForFruitCollision(player);
        }
    }
    
    return { 
        movePlayer, 
        state,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit
    }
}

export {createGame};